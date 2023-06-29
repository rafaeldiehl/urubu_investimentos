"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = __importDefault(require("../services/DatabaseConnection"));
const CreditCard_1 = __importDefault(require("../models/CreditCard"));
const db = DatabaseConnection_1.default.getInstance().getConnection();
class CreditCardRepository {
    async getCreditCardById(id) {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM credit_cards WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        const creditCardData = rows[0];
        const creditCard = new CreditCard_1.default(creditCardData.id, creditCardData.user_id, creditCardData.card_number, creditCardData.expiration_date, creditCardData.cvv);
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
    async getCreditCardDetailsFromDB(id) {
        const connection = await db;
        const [rows] = await connection.query('SELECT pin, card_balance, ninja_name, ninja_clan, ninja_rank FROM credit_cards WHERE id = ?', [id]);
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
    async getBalanceById(id) {
        const connection = await db;
        const [rows] = await connection.query('SELECT card_balance FROM credit_cards WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        const balance = rows[0].card_balance;
        return balance;
    }
    async createCreditCard(creditCard) {
        const connection = await db;
        const [result] = await connection.query('INSERT INTO credit_cards (user_id, card_number, expiration_date, cvv, card_balance, pin, ninja_name, ninja_clan, ninja_rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [creditCard.userId, creditCard.cardNumber, creditCard.expirationDate, creditCard.cvv, creditCard.cardBalance, creditCard.pin, creditCard.ninjaName, creditCard.ninjaClan, creditCard.ninjaRank]);
        const createdCreditCardId = result.insertId;
        const createdCreditCard = new CreditCard_1.default(createdCreditCardId, creditCard.userId, creditCard.cardNumber, creditCard.expirationDate, creditCard.cvv);
        return createdCreditCard;
    }
    async deleteCreditCard(id) {
        const connection = await db;
        const [result] = await connection.query('DELETE FROM credit_cards WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
exports.default = CreditCardRepository;
