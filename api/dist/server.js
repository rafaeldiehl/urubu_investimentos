"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'segredo',
    resave: false,
    saveUninitialized: false,
}));
app.use(routes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🐦 Servidor rodando na porta ${port}`);
});
