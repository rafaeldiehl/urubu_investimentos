export interface NinjaName {
  name: string;
  clan: string;
  ninjaRank: string;
}

export interface NinjaFactory {
  generateNinjaName(cardNumber: string, expirationDate: string, cvv: string): NinjaName;
}

export class NinjaNameFactory implements NinjaFactory {
  generateNinjaName(cardNumber: string, expirationDate: string, cvv: string): NinjaName {
    const name = this.generateName(cardNumber);
    const clan = this.generateClan(expirationDate);
    const ninjaRank = this.generateNinjaRank(cvv);

    return {
      name,
      clan,
      ninjaRank,
    };
  }

  private generateName(cardNumber: string): string {
    const nameVariations = ["Naruto", "Sasuke", "Sakura", "Senju", "Hinata", "Kakashi", "Shikamaru", "Ino", "Choji", "Neji"];
    const cardDigits = cardNumber.split('').map(Number);
    const index = cardDigits.reduce((sum, digit) => sum + digit, 0) % nameVariations.length;
    return nameVariations[index];
  }

  private generateClan(expirationDate: string): string {
    const clanVariations = ["Uchiha", "Hyuga", "Senju", "Nara", "Inuzuka", "Akimichi", "Yamanaka", "Aburame", "Sarutobi", "Hozuki", "Shimura", "Uzumaki"];
    const [month, year] = expirationDate.split('/');
    const monthIndex = parseInt(month) - 1;
    return clanVariations[monthIndex];
  }

  private generateNinjaRank(cvv: string): string {
    const rankVariations = ["Genin", "Chunin", "Jonin", "Anbu", "Sannin", "Kage"];
    const cvvDigits = cvv.split('').map(Number);
    const index = cvvDigits.reduce((sum, digit) => sum + digit, 0) % rankVariations.length;
    return rankVariations[index];
  }
}

interface NinjaAbstractFactory {
  createNinjaFactory(): NinjaFactory;
}

class ConcreteNinjaAbstractFactory implements NinjaAbstractFactory {
  createNinjaFactory(): NinjaFactory {
    return new NinjaNameFactory();
  }
}