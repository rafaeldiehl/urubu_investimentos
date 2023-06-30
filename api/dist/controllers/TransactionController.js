"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionRepository_1 = __importStar(require("../repositories/TransactionRepository"));
const transactionRepository = new TransactionRepository_1.default();
class TransactionController {
    async getTransaction(req, res) {
        try {
            const transactionId = parseInt(req.params.id);
            const transaction = await transactionRepository.getTransactionById(transactionId);
            if (transaction) {
                const transactionDTO = {
                    id: transaction.id,
                    userId: transaction.userId,
                    creditId: transaction.creditId,
                    amount: transaction.amount,
                    transactionType: transaction.transactionType,
                    transactionDate: transaction.transactionDate
                };
                res.json(transactionDTO);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar transação.' });
        }
    }
    async deposit(req, res) {
        try {
            const { userId, creditCardId, amount, pin } = req.body;
            console.log(req.body);
            transactionRepository.setStrategy(new TransactionRepository_1.DepositStrategy());
            const createdTransaction = await transactionRepository.executeTransaction(userId, creditCardId, amount, pin);
            res.json(createdTransaction);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao transferir do cartão de crédito para carteira de investimento.' });
        }
    }
    async withdrawal(req, res) {
        try {
            const { userId, creditCardId, amount } = req.body;
            transactionRepository.setStrategy(new TransactionRepository_1.WithdrawalStrategy());
            const createdTransaction = await transactionRepository.executeTransaction(userId, creditCardId, amount);
            res.json(createdTransaction);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao transferir da carteira de investimento para o cartão de crédito.' });
        }
    }
    async makeInvestment(req, res) {
        try {
            const { userId, amount } = req.body;
            const createdTransaction = await transactionRepository.makeInvestment(userId, amount);
            res.json(createdTransaction);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao fazer o investimento.' });
        }
    }
}
exports.default = TransactionController;
