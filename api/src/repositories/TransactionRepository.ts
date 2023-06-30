import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import DatabaseConnection from '../services/DatabaseConnection';
import Transaction from '../models/Transaction';

const db = DatabaseConnection.getInstance().getConnection();

interface TransactionStrategy {
  execute(userId: number, creditCardId: number, amount: number, pin?: number): Promise<Transaction>;
}

export class DepositStrategy implements TransactionStrategy {
  public async execute(userId: number, creditCardId: number, amount: number, pin: number): Promise<Transaction> {
    const connection = await db;
    const transactionType = 'deposit';

    const [creditCardRows] = await connection.query('SELECT card_balance, user_id, pin FROM credit_cards WHERE id = ?', [creditCardId]) as RowDataPacket[];
    const creditCardBalance = creditCardRows[0].card_balance;
    const cardOwnerId = creditCardRows[0].user_id;
    const cardPin = creditCardRows[0].pin;

    console.log(cardPin);
    console.log(pin);

    if (pin != cardPin) {
      throw new Error('PIN inválido para o cartão de crédito.');
    }

    if (amount > creditCardBalance) {
      throw new Error('Saldo insuficiente no cartão de crédito.');
    }

    if (cardOwnerId !== userId) {
      throw new Error('O cartão de crédito não pertence ao usuário.');
    }

    await connection.beginTransaction();

    try {
      await connection.query('UPDATE credit_cards SET card_balance = card_balance - ? WHERE id = ?', [amount, creditCardId]);

      await connection.query('UPDATE users SET investment_balance = investment_balance + ? WHERE id = ?', [amount, userId]);

      const [result] = await connection.query(
        'INSERT INTO investment_transactions (user_id, card_credit_id, amount, transaction_type) VALUES (?, ?, ?, ?)',
        [userId, creditCardId, amount, transactionType]
      );

      const createdTransactionId = (result as OkPacket).insertId;
      const createdTransaction = new Transaction(
        createdTransactionId,
        userId,
        creditCardId,
        amount,
        transactionType,
        new Date()
      );

      await connection.commit();
      return createdTransaction;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
}

export class WithdrawalStrategy implements TransactionStrategy {
  public async execute(userId: number, creditCardId: number, amount: number): Promise<Transaction> {
    const connection = await db;
    const transactionType = 'withdrawal';

    const [userRows] = await connection.query('SELECT investment_balance FROM users WHERE id = ?', [userId]) as RowDataPacket[];
    const investmentBalance = userRows[0].investment_balance;

    if (amount > investmentBalance) {
      throw new Error('Saldo insuficiente na carteira de investimentos.');
    }

    const [creditCardRows] = await connection.query('SELECT user_id FROM credit_cards WHERE id = ?', [creditCardId]) as RowDataPacket[];
    const cardOwnerId = creditCardRows[0].user_id;

    if (cardOwnerId !== userId) {
      throw new Error('O cartão de crédito não pertence ao usuário.');
    }

    await connection.beginTransaction();

    try {
      await connection.query('UPDATE credit_cards SET card_balance = card_balance + ? WHERE id = ?', [amount, creditCardId]);

      await connection.query('UPDATE users SET investment_balance = investment_balance - ? WHERE id = ?', [amount, userId]);

      const [result] = await connection.query(
        'INSERT INTO investment_transactions (user_id, card_credit_id, amount, transaction_type) VALUES (?, ?, ?, ?)',
        [userId, creditCardId, amount, transactionType]
      );

      const createdTransactionId = (result as OkPacket).insertId;
      const createdTransaction = new Transaction(
        createdTransactionId,
        userId,
        creditCardId,
        amount,
        transactionType,
        new Date()
      );

      await connection.commit();
      return createdTransaction;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
}

class TransactionRepository {
  private strategy?: TransactionStrategy;

  constructor(strategy?: TransactionStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: TransactionStrategy) {
    this.strategy = strategy;
  }

  public async executeTransaction(userId: number, creditCardId: number, amount: number, pin?: number): Promise<Transaction> {
    if (!this.strategy) {
    throw new Error('Nenhuma estratégia de transação definida.');
    }
    return this.strategy.execute(userId, creditCardId, amount, pin);
  }

  public async getTransactionById(id: number): Promise<Transaction | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM investment_transactions WHERE id = ?', [id]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const transactionData = rows[0];
    const transaction = new Transaction(
      transactionData.id,
      transactionData.user_id,
      transactionData.card_credit_id,
      transactionData.amount,
      transactionData.transaction_type,
      transactionData.transaction_date
    );

    return transaction;
  }

  public async makeInvestment(userId: number, amount: number): Promise<Transaction> {
    const connection = await db;
    const transactionType = 'investment';

    const [userRows] = await connection.query('SELECT investment_balance FROM users WHERE id = ?', [userId]) as RowDataPacket[];
    const investmentBalance = userRows[0].investment_balance;

    if (amount > investmentBalance) {
      throw new Error('Saldo insuficiente na carteira de investimentos.');
    }

    await connection.beginTransaction();

    try {
      await connection.query('UPDATE users SET investment_balance = investment_balance - ? WHERE id = ?', [amount, userId]);

      const [result] = await connection.query(
        'INSERT INTO investment_transactions (user_id, amount, transaction_type) VALUES (?, ?, ?)',
        [userId, amount, transactionType]
      );

      const createdTransactionId = (result as OkPacket).insertId;
      const createdTransaction = new Transaction(
        createdTransactionId,
        userId,
        0, // Não há necessidade de especificar o cartão de crédito
        amount,
        transactionType,
        new Date()
      );

      await connection.commit();

      setTimeout(async () => {
        try {
          // Verifica se a transação ainda é válida
          const transaction = await this.getTransactionById(createdTransactionId);
          if (transaction) {
            await this.multiplyInvestment(userId, transaction.id);
          }
        } catch (error) {
          console.error('Erro ao realizar a multiplicação do investimento:', error);
        }
      }, 20000);

      return createdTransaction;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }

  private async multiplyInvestment(userId: number, transactionId: number): Promise<void> {
    const connection = await db;
  
    try {
      const [transactionRows] = await connection.query('SELECT amount FROM investment_transactions WHERE id = ?', [transactionId]) as RowDataPacket[];
      const originalAmount = transactionRows[0].amount;
  
      const newAmount = originalAmount * 10;
  
      const transactionType = 'gain';
      const [result] = await connection.query(
        'INSERT INTO investment_transactions (user_id, amount, transaction_type) VALUES (?, ?, ?)',
        [userId, newAmount, transactionType]
      );
      // Atualiza o valor do saldo do usuário com o novo valor
      await connection.query('UPDATE users SET investment_balance = investment_balance + ? WHERE id = ?', [newAmount, userId]);
  
      console.log(`Nova operação realizada com sucesso. Valor do investimento multiplicado por 10.`);
  
      // Restante da lógica da nova operação, se houver...
    } catch (error) {
      console.error('Erro ao multiplicar o valor do investimento:', error);
    }
  }
}

export default TransactionRepository;
