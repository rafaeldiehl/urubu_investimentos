"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreditCardRepository_1 = __importDefault(require("../repositories/CreditCardRepository"));
const CreditCard_1 = __importDefault(require("../models/CreditCard"));
const creditCardRepository = new CreditCardRepository_1.default();
class CreditCardController {
    async createCreditCard(req, res) {
        try {
            const { userId, cardNumber, expirationDate, cvv } = req.body;
            const newCreditCard = new CreditCard_1.default(0, userId, cardNumber, expirationDate, cvv);
            const createdCreditCard = await creditCardRepository.createCreditCard(newCreditCard);
            const CreditCardDTO = {
                id: createdCreditCard.id,
                userId: createdCreditCard.userId,
                cardNumber: createdCreditCard.cardNumber,
                expirationDate: createdCreditCard.expirationDate,
                cvv: createdCreditCard.cvv,
                cardBalance: createdCreditCard.cardBalance,
                ninjaName: createdCreditCard.ninjaName,
                ninjaClan: createdCreditCard.ninjaClan,
                ninjaRank: createdCreditCard.ninjaRank
            };
            res.json(CreditCardDTO);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao criar cartão de crédito.' });
        }
    }
    async getCreditCard(req, res) {
        try {
            const creditCardId = parseInt(req.params.id);
            const creditCard = await creditCardRepository.getCreditCardById(creditCardId);
            console.log(creditCard);
            if (creditCard) {
                const creditCardDTO = {
                    id: creditCard.id,
                    userId: creditCard.userId,
                    cardNumber: creditCard.cardNumber,
                    expirationDate: creditCard.expirationDate,
                    cvv: creditCard.cvv,
                    cardBalance: creditCard.cardBalance,
                    ninjaName: creditCard.ninjaName,
                    ninjaClan: creditCard.ninjaClan,
                    ninjaRank: creditCard.ninjaRank
                };
                res.json(creditCardDTO);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async deleteCreditCard(req, res) {
        try {
            const creditCardId = parseInt(req.params.id);
            const deleted = await creditCardRepository.deleteCreditCard(creditCardId);
            if (deleted) {
                res.json({ message: 'Cartão de crédito removido com sucesso.' });
            }
            else {
                res.status(404).json({ error: 'Cartão de crédito não encontrado.' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao remover cartão de crédito.' });
        }
    }
}
exports.default = CreditCardController;
