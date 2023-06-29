"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = __importDefault(require("../services/DatabaseConnection"));
const User_1 = __importDefault(require("../models/User"));
const CreditCard_1 = __importDefault(require("../models/CreditCard"));
const db = DatabaseConnection_1.default.getInstance().getConnection();
class UserRepository {
    async getAllUsers() {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM users');
        const users = rows.map((row) => new User_1.default(row.id, row.name, row.email, row.password, row.investment_balance));
        return users;
    }
    async getUserById(id) {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        const userData = rows[0];
        const user = new User_1.default(userData.id, userData.name, userData.email, userData.password, userData.investment_balance);
        return user;
    }
    async createUser(user) {
        const connection = await db;
        const [result] = await connection.query('INSERT INTO users (name, email, password, investment_balance) VALUES (?, ?, ?, ?)', [user.name, user.email, user.password, user.investmentBalance]);
        const createdUserId = result.insertId;
        const createdUser = new User_1.default(createdUserId, user.name, user.email, user.password, user.investmentBalance);
        return createdUser;
    }
    async deleteUser(id) {
        const connection = await db;
        const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    async getUserByEmail(email) {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        const userData = rows[0];
        const user = new User_1.default(userData.id, userData.name, userData.email, userData.password, userData.investment_balance);
        return user;
    }
    async comparePassword(password, passwordSent) {
        return password === passwordSent;
    }
    async getUserCreditCards(userId) {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM credit_cards WHERE user_id = ?', [userId]);
        const creditCards = rows.map((row) => new CreditCard_1.default(row.id, row.user_id, row.card_number, row.expiration_date, row.cvv));
        return creditCards;
    }
}
exports.default = UserRepository;
