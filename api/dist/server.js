"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const UserRepository_1 = __importDefault(require("./repositories/UserRepository"));
const express_session_1 = __importDefault(require("express-session")); // Importe o express-session
require('dotenv').config();
const app = (0, express_1.default)();
const userRepository = new UserRepository_1.default();
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado.' });
        }
        const isPasswordValid = await userRepository.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Senha incorreta.' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'segredo',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(routes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🐦 Servidor rodando na porta ${port}`);
});
