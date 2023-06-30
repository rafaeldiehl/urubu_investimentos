import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import session from 'express-session';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'segredo',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🐦 Servidor rodando na porta ${port}`);
});