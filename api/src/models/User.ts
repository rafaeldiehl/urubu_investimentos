export default class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _investmentBalance: number;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    investmentBalance: number = 0
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._investmentBalance = investmentBalance;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get investmentBalance(): number {
    return this._investmentBalance;
  }

  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set investmentBalance(value: number) {
    this._investmentBalance = value;
  }
}