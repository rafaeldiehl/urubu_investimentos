"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomDataFactory = exports.BalanceGenerator = exports.PinGenerator = void 0;
class PinGenerator {
    constructor() {
        this.data = 1000;
    }
    generateRandom() {
        const randomPin = Math.floor(Math.random() * 9000) + 1000;
        this.data = randomPin;
    }
}
exports.PinGenerator = PinGenerator;
class BalanceGenerator {
    constructor() {
        this.data = 0;
    }
    generateRandom() {
        const randomBalance = Math.floor(Math.random() * 10001);
        this.data = randomBalance;
    }
}
exports.BalanceGenerator = BalanceGenerator;
// Factory
class RandomDataFactory {
    static createRandomData(type) {
        if (type === "pin") {
            return new PinGenerator();
        }
        else if (type === "balance") {
            return new BalanceGenerator();
        }
        else {
            throw new Error("Tipo inválido de dado.");
        }
    }
}
exports.RandomDataFactory = RandomDataFactory;
