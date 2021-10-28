import { createConnection } from "typeorm";

const connection = createConnection().then((connection) => {
  return connection;
});

export { connection };
