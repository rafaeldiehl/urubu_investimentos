"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NinjaNameFactory = void 0;
class NinjaNameFactory {
    generateNinjaName(cardNumber, expirationDate, cvv) {
        const name = this.generateName(cardNumber);
        const clan = this.generateClan(expirationDate);
        const ninjaRank = this.generateNinjaRank(cvv);
        return {
            name,
            clan,
            ninjaRank,
        };
    }
    generateName(cardNumber) {
        const nameVariations = ["Naruto", "Sasuke", "Sakura", "Senju", "Hinata", "Kakashi", "Shikamaru", "Ino", "Choji", "Neji"];
        const cardDigits = cardNumber.split('').map(Number);
        const index = cardDigits.reduce((sum, digit) => sum + digit, 0) % nameVariations.length;
        return nameVariations[index];
    }
    generateClan(expirationDate) {
        const clanVariations = ["Uchiha", "Hyuga", "Senju", "Nara", "Inuzuka", "Akimichi", "Yamanaka", "Aburame", "Sarutobi", "Hozuki", "Shimura", "Uzumaki"];
        const [month, year] = expirationDate.split('/');
        const monthIndex = parseInt(month) - 1;
        return clanVariations[monthIndex];
    }
    generateNinjaRank(cvv) {
        const rankVariations = ["Genin", "Chunin", "Jonin", "Anbu", "Sannin", "Kage"];
        const cvvDigits = cvv.split('').map(Number);
        const index = cvvDigits.reduce((sum, digit) => sum + digit, 0) % rankVariations.length;
        return rankVariations[index];
    }
}
exports.NinjaNameFactory = NinjaNameFactory;
class ConcreteNinjaAbstractFactory {
    createNinjaFactory() {
        return new NinjaNameFactory();
    }
}
