"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const userRepository = new UserRepository_1.default();
class LoginController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
                return;
            }
            const user = await userRepository.getUserByEmail(email);
            if (user && user.password === password) {
                const userDTO = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    investment_balance: user.investmentBalance
                };
                res.json(userDTO);
            }
            else {
                res.status(401).json({ error: 'Credenciais inválidas.' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao realizar o login.' });
        }
    }
}
exports.default = LoginController;
