"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NinjaFactory_1 = require("../services/NinjaFactory");
const RandomDataFactory_1 = require("../services/RandomDataFactory");
class CreditCard {
    constructor(id, userId, cardNumber, expirationDate, cvv) {
        this._id = id;
        this._userId = userId;
        this._cardNumber = cardNumber;
        this._expirationDate = expirationDate;
        this._cvv = cvv;
        const balanceGenerator = RandomDataFactory_1.RandomDataFactory.createRandomData("balance");
        balanceGenerator.generateRandom();
        this._cardBalance = balanceGenerator.data;
        const pinGenerator = RandomDataFactory_1.RandomDataFactory.createRandomData("pin");
        pinGenerator.generateRandom();
        this._pin = pinGenerator.data;
        const ninjaFactory = new NinjaFactory_1.NinjaNameFactory();
        const ninjaGeneratedName = ninjaFactory.generateNinjaName(cardNumber, expirationDate, cvv);
        this._ninjaName = ninjaGeneratedName.name;
        this._ninjaClan = ninjaGeneratedName.clan;
        this._ninjaRank = ninjaGeneratedName.ninjaRank;
    }
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    get userId() {
        return this._userId;
    }
    set userId(val) {
        this._userId = val;
    }
    get cardNumber() {
        return this._cardNumber;
    }
    set cardNumber(val) {
        this._cardNumber = val;
    }
    get expirationDate() {
        return this._expirationDate;
    }
    set expirationDate(val) {
        this._expirationDate = val;
    }
    get cvv() {
        return this._cvv;
    }
    set cvv(val) {
        this._cvv = val;
    }
    get cardBalance() {
        return this._cardBalance;
    }
    set cardBalance(val) {
        this._cardBalance = val;
    }
    get pin() {
        return this._pin;
    }
    set pin(val) {
        this._pin = val;
    }
    get ninjaName() {
        return this._ninjaName;
    }
    set ninjaName(val) {
        this._ninjaName = val;
    }
    get ninjaClan() {
        return this._ninjaClan;
    }
    set ninjaClan(val) {
        this._ninjaClan = val;
    }
    get ninjaRank() {
        return this._ninjaRank;
    }
    set ninjaRank(val) {
        this._ninjaRank = val;
    }
}
exports.default = CreditCard;
