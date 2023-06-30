import { Request, Response } from 'express';
import TransactionRepository, { DepositStrategy, WithdrawalStrategy } from '../repositories/TransactionRepository';
import TransactionDTO from '../DTO/TransactionDTO';

const transactionRepository = new TransactionRepository();

class TransactionController {
  
  public async getTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transactionId = parseInt(req.params.id);
      
      const transaction = await transactionRepository.getTransactionById(transactionId);

      if (transaction) {
        const transactionDTO: TransactionDTO = {
          id: transaction.id,
          userId: transaction.userId,
          creditId: transaction.creditId,
          amount: transaction.amount,
          transactionType: transaction.transactionType,
          transactionDate: transaction.transactionDate
        };
        
        res.json(transactionDTO);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar transação.' });
    }
  }

  public async deposit(req: Request, res: Response): Promise<void> {
    try {
      const { userId, creditCardId, amount, pin } = req.body;
      console.log(req.body);

      transactionRepository.setStrategy(new DepositStrategy());
      const createdTransaction = await transactionRepository.executeTransaction(userId, creditCardId, amount, pin);

      res.json(createdTransaction);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao transferir do cartão de crédito para carteira de investimento.' });
    }
  }

  public async withdrawal(req: Request, res: Response): Promise<void> {
    try {
      const { userId, creditCardId, amount } = req.body;

      transactionRepository.setStrategy(new WithdrawalStrategy());
      const createdTransaction = await transactionRepository.executeTransaction(userId, creditCardId, amount);

      res.json(createdTransaction);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao transferir da carteira de investimento para o cartão de crédito.' });
    }
  }

  public async makeInvestment(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount } = req.body;

      const createdTransaction = await transactionRepository.makeInvestment(userId, amount);

      res.json(createdTransaction);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer o investimento.' });
    }
  }
}

export default TransactionController;