import dotenv from "dotenv";
// load environment variables from .env file
dotenv.config();

import app from "./app";
import {RedisService} from "./services";

const port = 3000;

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

//Tratamento no encerramento
process.on("SIGTERM", () => {
  server.close(async () => {
    console.log(`Disconnecting from Redis ...`);
    await RedisService.disconnectAllInstances();
    console.log(`BYE!`);
  });
});
