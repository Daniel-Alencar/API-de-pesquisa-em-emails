import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

// Esta createConnection() é a função que definimos no arquivo 'index.ts' que está dentro da pasta database
// A conexão será em BDs diferentes dependendo se estamos em ambiente de produção ou de desenvolvimento
createConnection();

const app = express();
app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${error.message}`
  })
})

export { app }
