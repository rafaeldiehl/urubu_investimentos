export default class Transaction {
  private _id: number;
  private _userId: number;
  private _amount: number;
  private _transactionType: 'deposit' | 'withdrawal' | 'investment';
  private _transactionDate: Date;

  constructor(
  id: number,
    userId: number,
    amount: number,
    transactionType: 'deposit' | 'withdrawal' | 'investment',
    transactionDate: Date = new Date()
  ) {
    this._id = id;
    this._userId = userId;
    this._amount = amount;
    this._transactionType = transactionType;
    this._transactionDate = transactionDate;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get transactionType(): 'deposit' | 'withdrawal' | 'investment' {
    return this._transactionType;
  }

  set transactionType(transactionType: 'deposit' | 'withdrawal' | 'investment') {
    this._transactionType = transactionType;
  }

  get transactionDate(): Date {
    return this._transactionDate;
  }

  set transactionDate(transactionDate: Date) {
    this._transactionDate = transactionDate;
  }
}
  