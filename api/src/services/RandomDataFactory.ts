export interface RandomData {
  data: number;
  generateRandom(): void;
}

export class PinGenerator implements RandomData {
  data: number;

  constructor() {
    this.data = 1000;
  }

  generateRandom(): void {
    const randomPin = Math.floor(Math.random() * 9000) + 1000;
    this.data = randomPin;
  }
}

export class BalanceGenerator implements RandomData {
  data: number;

  constructor() {
    this.data = 0;
  }

  generateRandom(): void {
    const randomBalance = Math.floor(Math.random() * 10001);
    this.data = randomBalance;
  }
}

// Factory
export class RandomDataFactory {
  static createRandomData(type: string): RandomData {
    if (type === "pin") {
      return new PinGenerator();
    } else if (type === "balance") {
      return new BalanceGenerator();
    } else {
      throw new Error("Tipo inválido de dado.");
    }
  }
}