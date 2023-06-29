import { createConnection, Connection } from 'mysql2/promise';

require('dotenv').config();

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: Promise<Connection>;

  private constructor() {
    this.connection = createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'urubu_do_pix'
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }

    return DatabaseConnection.instance;
  }

  public async getConnection(): Promise<Connection> {
    return await this.connection;
  }
}

export default DatabaseConnection;
