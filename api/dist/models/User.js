"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, email, password, investmentBalance = 0) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._investmentBalance = investmentBalance;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get investmentBalance() {
        return this._investmentBalance;
    }
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set email(value) {
        this._email = value;
    }
    set password(value) {
        this._password = value;
    }
    set investmentBalance(value) {
        this._investmentBalance = value;
    }
}
exports.default = User;
