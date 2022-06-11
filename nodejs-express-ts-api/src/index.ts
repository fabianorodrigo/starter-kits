import cors from "cors";
import express from "express";
import {getUser, PersonController} from "./controllers";
import PersonRouter from "./routes/person.route";

const port = 3000;
const app = express();

// Enable CORS
app.use(cors());
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Users
app.get("/user/", getUser);

//****************************************** TO DOS *************************************** */
// 1. Fazer testes automatizados (ver como sobe o express)
// 2. Reavalizar os AWAITs e PROMISES
app.use(`/person`, PersonRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
