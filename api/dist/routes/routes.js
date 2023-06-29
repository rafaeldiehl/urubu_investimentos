"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const CreditCardController_1 = __importDefault(require("../controllers/CreditCardController"));
const routes = (0, express_1.Router)();
const userController = new UserController_1.default();
const creditCardController = new CreditCardController_1.default();
routes.post('/login', (req, res) => {
    try {
        userController.login(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login.' });
    }
});
routes.get('/users', async (req, res) => {
    try {
        await userController.getAllUsers(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});
routes.get('/users/:id', async (req, res) => {
    try {
        await userController.getUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
});
routes.get('/users/:id/credit-cards', async (req, res) => {
    try {
        await userController.getUserCreditCards(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cartões de crédito do usuário.' });
    }
});
routes.post('/users', async (req, res) => {
    try {
        await userController.createUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});
routes.delete('/users/:id', async (req, res) => {
    try {
        await userController.deleteUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao remover usuário.' });
    }
});
routes.get('/credit-cards/:id', async (req, res) => {
    try {
        await creditCardController.getCreditCard(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cartão de crédito.' });
    }
});
routes.post('/credit-cards', async (req, res) => {
    try {
        await creditCardController.createCreditCard(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar cartão de crédito.' });
    }
});
routes.delete('/credit-cards/:id', async (req, res) => {
    try {
        await creditCardController.deleteCreditCard(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao remover cartão de crédito.' });
    }
});
exports.default = routes;
