import { Request, Response } from 'express';
import CreditCardRepository from '../repositories/CreditCardRepository';
import CreditCardDTO from '../DTO/CreditCardDTO';
import CreditCard from '../models/CreditCard';

const creditCardRepository = new CreditCardRepository();

class CreditCardController {
  public async createCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const { userId, cardNumber, expirationDate, cvv } = req.body;

      const newCreditCard = new CreditCard(0, userId, cardNumber, expirationDate, cvv);

      const createdCreditCard = await creditCardRepository.createCreditCard(newCreditCard);

      const CreditCardDTO: CreditCardDTO = {
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
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cartão de crédito.' });
    }
  }

  public async getCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const creditCardId = parseInt(req.params.id);
      
      const creditCard = await creditCardRepository.getCreditCardById(creditCardId);
      console.log(creditCard);

      if (creditCard) {
        const creditCardDTO: CreditCardDTO = {
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
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async deleteCreditCard(req: Request, res: Response): Promise<void> {
    try {
      const creditCardId = parseInt(req.params.id);

      const deleted = await creditCardRepository.deleteCreditCard(creditCardId);

      if (deleted) {
        res.json({ message: 'Cartão de crédito removido com sucesso.' });
      } else {
        res.status(404).json({ error: 'Cartão de crédito não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover cartão de crédito.' });
    }
  }
}

export default CreditCardController;