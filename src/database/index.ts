import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// o objetivo ao alterar é que devemos saber em qual banco de dados devemos nos conectar, e isso depende em que ambiente estamos (ambiente de produção, teste ou desenvolvimento)
export default async(): Promise<Connection> => {

  // defaultOptions terá todas as configurações de nosso arquivo ormconfig.json
  const defaultOptions = await getConnectionOptions();

  return createConnection(

    // mudamos o diretório do banco de dados utilizado dependendo da variável ambiente em que estamos inseridos
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' 
      ? "./src/database/database.test.sqlite" 
      : defaultOptions.database
    })
  );
}
