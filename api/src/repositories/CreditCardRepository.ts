import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import DatabaseConnection from '../services/DatabaseConnection';
import CreditCard from '../models/CreditCard';

const db = DatabaseConnection.getInstance().getConnection();

interface CreditCardDetails {
  pin: number;
  balance: number;
  ninjaName: string;
  ninjaClan: string;
  ninjaRank: string;
}

class CreditCardRepository {

  public async getCreditCardById(id: number): Promise<CreditCard | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM credit_cards WHERE id = ?', [id]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const creditCardData = rows[0];
    
    const creditCard = new CreditCard(
      creditCardData.id,
      creditCardData.user_id,
      creditCardData.card_number,
      creditCardData.expiration_date,
      creditCardData.cvv
    );

    const details = await this.getCreditCardDetailsFromDB(id);

    if (details !== null) {
      creditCard.pin = details.pin;
      creditCard.cardBalance = details.balance;
      creditCard.ninjaName = details.ninjaName;
      creditCard.ninjaClan = details.ninjaClan;
      creditCard.ninjaRank = details.ninjaRank;
    }
    
    const balance = await this.getBalanceById(id);
    if (balance !== null) {
      creditCard.cardBalance = balance;
    }

    return creditCard;
  }

  private async getCreditCardDetailsFromDB(id: number): Promise<CreditCardDetails | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT pin, card_balance, ninja_name, ninja_clan, ninja_rank FROM credit_cards WHERE id = ?', [id]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const details = rows[0];

    return {
      pin: details.pin,
      balance: details.card_balance,
      ninjaName: details.ninja_name,
      ninjaClan: details.ninja_clan,
      ninjaRank: details.ninja_rank,
    };
  }

  public async getBalanceById(id: number): Promise<number | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT card_balance FROM credit_cards WHERE id = ?', [id]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const balance = rows[0].card_balance;
    return balance;
  }

  public async createCreditCard(creditCard: CreditCard): Promise<CreditCard> {
    const connection = await db;

    const [result] = await connection.query(
      'INSERT INTO credit_cards (user_id, card_number, expiration_date, cvv, card_balance, pin, ninja_name, ninja_clan, ninja_rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [creditCard.userId, creditCard.cardNumber, creditCard.expirationDate, creditCard.cvv, creditCard.cardBalance, creditCard.pin, creditCard.ninjaName, creditCard.ninjaClan, creditCard.ninjaRank]
    );

    const createdCreditCardId = (result as ResultSetHeader).insertId;
    const createdCreditCard = new CreditCard(
      createdCreditCardId,
      creditCard.userId,
      creditCard.cardNumber,
      creditCard.expirationDate,
      creditCard.cvv
    );

    return createdCreditCard;
  }

  public async deleteCreditCard(id: number): Promise<boolean> {
    const connection = await db;
    const [result] = await connection.query('DELETE FROM credit_cards WHERE id = ?', [id]) as OkPacket[];

    return result.affectedRows > 0;
  }
}

export default CreditCardRepository;