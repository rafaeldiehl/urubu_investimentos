"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const User_1 = __importDefault(require("../models/User"));
const passport_1 = __importDefault(require("passport"));
const userRepository = new UserRepository_1.default();
class UserController {
    login(req, res) {
        passport_1.default.authenticate('local', (err, user, info) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao realizar o login.' });
                return;
            }
            if (!user) {
                res.status(401).json({ error: info.message });
                return;
            }
            const userDTO = {
                id: user.id,
                name: user.name,
                email: user.email,
                investment_balance: user.investmentBalance,
            };
            res.json(userDTO);
        })(req, res);
    }
    async getAllUsers(req, res) {
        try {
            const users = await userRepository.getAllUsers();
            const usersDTO = users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                investment_balance: user.investmentBalance
            }));
            res.json(usersDTO);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    }
    async getUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const user = await userRepository.getUserById(userId);
            if (user) {
                const userDTO = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    investment_balance: user.investmentBalance
                };
                res.json(userDTO);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
    }
    async createUser(req, res) {
        try {
            const { name, password, email } = req.body;
            const newUser = new User_1.default(0, name, email, password);
            const createdUser = await userRepository.createUser(newUser);
            const userDTO = {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                investment_balance: 0
            };
            res.json(userDTO);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const deleted = await userRepository.deleteUser(userId);
            if (deleted) {
                res.json({ message: 'Usuário removido com sucesso.' });
            }
            else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao remover usuário.' });
        }
    }
    async getUserCreditCards(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const user = await userRepository.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado.' });
                return;
            }
            const creditCards = await userRepository.getUserCreditCards(userId);
            const creditCardsDTO = creditCards.map(creditCard => ({
                id: creditCard.id,
                user_id: creditCard.userId,
                card_number: creditCard.cardNumber,
                expiration_date: creditCard.expirationDate,
                cvv: creditCard.cvv
            }));
            res.json(creditCardsDTO);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cartões de crédito do usuário.' });
        }
    }
}
exports.default = UserController;
