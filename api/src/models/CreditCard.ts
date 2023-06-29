import { NinjaFactory, NinjaName, NinjaNameFactory } from "../services/NinjaFactory";
import { RandomDataFactory } from "../services/RandomDataFactory";

export default class CreditCard {
  private _id: number;
  private _userId: number;
  private _cardNumber: string;
  private _expirationDate: string;
  private _cvv: string;
  private _cardBalance: number;
  private _pin: number;
  private _ninjaName: string;
  private _ninjaClan: string;
  private _ninjaRank: string;

  constructor(
    id: number,
    userId: number,
    cardNumber: string,
    expirationDate: string,
    cvv: string,

  ) {
    this._id = id;
    this._userId = userId;
    this._cardNumber = cardNumber;
    this._expirationDate = expirationDate;
    this._cvv = cvv;

    // Gere pin e saldo aleatório para fins de teste
    const balanceGenerator = RandomDataFactory.createRandomData("balance");
    balanceGenerator.generateRandom();
    this._cardBalance = balanceGenerator.data;
    const pinGenerator = RandomDataFactory.createRandomData("pin");
    pinGenerator.generateRandom();
    this._pin = pinGenerator.data;

    // Gera um nome ninja com os dados do cartão de crédito
    const ninjaFactory: NinjaFactory = new NinjaNameFactory();
    const ninjaGeneratedName: NinjaName = ninjaFactory.generateNinjaName(cardNumber, expirationDate, cvv);
    this._ninjaName = ninjaGeneratedName.name;
    this._ninjaClan = ninjaGeneratedName.clan;
    this._ninjaRank = ninjaGeneratedName.ninjaRank;
  }
  
  get id() {
    return this._id;
  }
  
  set id(val: number) {
    this._id = val;
  }
  
  get userId() {
    return this._userId;
  }
  
  set userId(val: number) {
    this._userId = val;
  }
  
  get cardNumber() {
    return this._cardNumber;
  }
  
  set cardNumber(val: string) {
    this._cardNumber = val;
  }
  
  get expirationDate() {
    return this._expirationDate;
  }
  
  set expirationDate(val: string) {
    this._expirationDate = val;
  }
  
  get cvv() {
    return this._cvv;
  }
  
  set cvv(val: string) {
    this._cvv = val;
  }
  
  get cardBalance() {
    return this._cardBalance;
  }
  
  set cardBalance(val: number) {
    this._cardBalance = val;
  }
  
  get pin() {
    return this._pin;
  }
  
  set pin(val: number) {
    this._pin = val;
  }
  
  get ninjaName() {
    return this._ninjaName;
  }
  
  set ninjaName(val: string) {
    this._ninjaName = val;
  }
  
  get ninjaClan() {
    return this._ninjaClan;
  }
  
  set ninjaClan(val: string) {
    this._ninjaClan = val;
  }
  
  get ninjaRank() {
    return this._ninjaRank;
  }
  
  set ninjaRank(val: string) {
    this._ninjaRank = val;
  }
}
