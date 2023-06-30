"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(id, userId, creditId, amount, transactionType, transactionDate = new Date()) {
        this._id = id;
        this._userId = userId;
        this._creditId = creditId;
        this._amount = amount;
        this._transactionType = transactionType;
        this._transactionDate = transactionDate;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get userId() {
        return this._userId;
    }
    set userId(userId) {
        this._userId = userId;
    }
    get creditId() {
        return this._creditId;
    }
    set creditId(creditId) {
        this._creditId = creditId;
    }
    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this._amount = amount;
    }
    get transactionType() {
        return this._transactionType;
    }
    set transactionType(transactionType) {
        this._transactionType = transactionType;
    }
    get transactionDate() {
        return this._transactionDate;
    }
    set transactionDate(transactionDate) {
        this._transactionDate = transactionDate;
    }
}
exports.default = Transaction;
