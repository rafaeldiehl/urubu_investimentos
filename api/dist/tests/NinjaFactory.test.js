"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('NinjaNameFactory', () => {
    let ninjaNameFactory;
    beforeEach(() => {
        ninjaNameFactory = new NinjaFactory_1.default();
    });
    describe('generateNinjaName', () => {
        it('should generate a ninja name', () => {
            const cardNumber = '1111222233334444';
            const expirationDate = '12/1235';
            const cvv = '566';
            const ninjaName = ninjaNameFactory.generateNinjaName(cardNumber, expirationDate, cvv);
            expect(ninjaName).toBeDefined();
            expect(ninjaName.name).toBe('Naruto');
            expect(ninjaName.clan).toBe('Uzumaki');
            expect(ninjaName.ninjaRank).toBe('Kage');
        });
    });
});
