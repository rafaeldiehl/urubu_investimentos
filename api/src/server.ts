import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User';
import UserRepository from './repositories/UserRepository';
import session from 'express-session'; // Importe o express-session

require('dotenv').config();

const app = express();

const userRepository = new UserRepository();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user: User | null = await userRepository.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await userRepository.comparePassword(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Senha incorreta.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'segredo',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🐦 Servidor rodando na porta ${port}`);
});