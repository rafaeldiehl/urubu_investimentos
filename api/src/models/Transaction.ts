export default class Transaction {
  private _id: number;
  private _userId: number;
  private _creditId: number;
  private _amount: number;
  private _transactionType: 'deposit' | 'withdrawal' | 'investment' | 'gain';
  private _transactionDate: Date;

  constructor(
    id: number,
    userId: number,
    creditId: number,
    amount: number,
    transactionType: 'deposit' | 'withdrawal' | 'investment' | 'gain',
    transactionDate: Date = new Date()
  ) {
    this._id = id;
    this._userId = userId;
    this._creditId = creditId;
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

  get creditId(): number {
    return this._creditId;
  }

  set creditId(creditId: number) {
    this._creditId = creditId;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get transactionType(): 'deposit' | 'withdrawal' | 'investment' | 'gain' {
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
  