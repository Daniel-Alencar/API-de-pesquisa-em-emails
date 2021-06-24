import 'reflect-metadata';
import express from 'express';
import createConnection from './database';
import { router } from './routes';

// Esta createConnection() é a função que definimos no arquivo 'index.ts' que está dentro da pasta database
// A conexão será em BDs diferentes dependendo se estamos em ambiente de produção ou de desenvolvimento
createConnection();

const app = express();
app.use(express.json());
app.use(router);

export { app }
