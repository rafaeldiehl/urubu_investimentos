import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserDTO from '../DTO/UserDTO';
import User from '../models/User';
import passport from 'passport';

const userRepository = new UserRepository();

class UserController {
  public login(req: Request, res: Response): void {
    passport.authenticate('local', (err: Error, user: User | false, info: any) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao realizar o login.' });
        return;
      }

      if (!user) {
        res.status(401).json({ error: info.message });
        return;
      }

      const userDTO: UserDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        investment_balance: user.investmentBalance,
      };

      res.json(userDTO);
    })(req, res);
  }
  
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepository.getAllUsers();

      const usersDTO: UserDTO[] = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        investment_balance: user.investmentBalance
      }));

      res.json(usersDTO);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      
      const user = await userRepository.getUserById(userId);

      if (user) {
        const userDTO: UserDTO = {
          id: user.id,
          name: user.name,
          email: user.email,
          investment_balance: user.investmentBalance
        };
        
        res.json(userDTO);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, password, email } = req.body;

      const newUser = new User(0, name, email, password);

      const createdUser = await userRepository.createUser(newUser);

      const userDTO: UserDTO = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        investment_balance: 0
      };

      res.json(userDTO);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);

      const deleted = await userRepository.deleteUser(userId);

      if (deleted) {
        res.json({ message: 'Usuário removido com sucesso.' });
      } else {
        res.status(404).json({ error: 'Usuário não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover usuário.' });
    }
  }

  public async getUserCreditCards(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);

      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
      }

      const creditCards = await userRepository.getUserCreditCards(userId);

      const creditCardsDTO: any[] = creditCards.map(creditCard => ({
        id: creditCard.id,
        user_id: creditCard.userId,
        card_number: creditCard.cardNumber,
        expiration_date: creditCard.expirationDate,
        cvv: creditCard.cvv
      }));

      res.json(creditCardsDTO);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cartões de crédito do usuário.' });
    }
  }
}

export default UserController;