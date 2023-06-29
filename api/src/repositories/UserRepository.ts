import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import DatabaseConnection from '../services/DatabaseConnection';
import User from '../models/User';
import CreditCard from '../models/CreditCard';

const db = DatabaseConnection.getInstance().getConnection();

class UserRepository {
  public async getAllUsers(): Promise<User[]> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM users') as RowDataPacket[];

    const users: User[] = rows.map(
      (row: RowDataPacket) =>
        new User(row.id, row.name, row.email, row.password, row.investment_balance)
    );

    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const userData = rows[0];
    const user = new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.investment_balance
    );

    return user;
  }

  public async createUser(user: User): Promise<User> {
    const connection = await db;
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, investment_balance) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.investmentBalance]
    );

    const createdUserId = (result as ResultSetHeader).insertId;
    const createdUser = new User(
      createdUserId,
      user.name,
      user.email,
      user.password,
      user.investmentBalance
    );

    return createdUser;
  }

  public async deleteUser(id: number): Promise<boolean> {
    const connection = await db;
    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]) as OkPacket[];

    return result.affectedRows > 0;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]) as RowDataPacket[];

    if (rows.length === 0) {
      return null;
    }

    const userData = rows[0];
    const user = new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.investment_balance
    );

    return user;
  }

  public async comparePassword(password: string, passwordSent: string): Promise<boolean> {
    return password === passwordSent;
  }

  public async getUserCreditCards(userId: number): Promise<CreditCard[]> {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM credit_cards WHERE user_id = ?', [userId]) as RowDataPacket[];
  
    const creditCards: CreditCard[] = rows.map(
      (row: RowDataPacket) =>
        new CreditCard(row.id, row.user_id, row.card_number, row.expiration_date, row.cvv)
    );
  
    return creditCards;
  }
}

export default UserRepository;