import dotenv from "dotenv";
// load environment variables from .env file
dotenv.config();

import app from "./app";

const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
