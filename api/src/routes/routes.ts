import { Router } from 'express';
import UserController from '../controllers/UserController';
import CreditCardController from '../controllers/CreditCardController';
import TransactionController from '../controllers/TransactionController';

const routes = Router();

const userController = new UserController();
const creditCardController = new CreditCardController();
const transactionController = new TransactionController();

routes.post('/login', (req, res) => {
  try {
    userController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar o login.' });
  }
});

routes.get('/users', async (req, res) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});


routes.get('/users/:id', async (req, res) => {
  try {
    await userController.getUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});

routes.get('/users/:id/credit-cards',async (req, res) => {
  try {
    await userController.getUserCreditCards(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cartões de crédito do usuário.' });
  }
});

routes.get('/users/:id/transactions',async (req, res) => {
  try {
    await userController.getUserTransactions(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações do usuário.' });
  }
});

routes.post('/users', async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

routes.delete('/users/:id', async (req, res) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário.' });
  }
});

routes.get('/credit-cards/:id', async (req, res) => {
  try {
    await creditCardController.getCreditCard(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cartão de crédito.' });
  }
});

routes.post('/credit-cards', async (req, res) => {
  try {
    await creditCardController.createCreditCard(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cartão de crédito.' });
  }
});

routes.delete('/credit-cards/:id', async (req, res) => {
  try {
    await creditCardController.deleteCreditCard(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover cartão de crédito.' });
  }
});

routes.get('/transactions/:id', async (req, res) => {
  try {
    await transactionController.getTransaction(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transação.' });
  }
});

routes.post('/transactions/deposit', async (req, res) => {
  try {
    await transactionController.deposit(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao transferir do cartão de crédito para carteira de investimento.' });
  }
});

routes.post('/transactions/withdrawal', async (req, res) => {
  try {
    await transactionController.withdrawal(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao transferir da carteira de investimento para o cartão de crédito.' });
  }
});

routes.post('/transactions/investment', async (req, res) => {
  try {
    await transactionController.makeInvestment(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao investir na carteira de investimento.' });
  }
});


export default routes;