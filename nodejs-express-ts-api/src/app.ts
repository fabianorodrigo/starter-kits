import cors from "cors";
import express from "express";
import {getUser} from "./controllers";
import PersonRouter from "./routes/person.route";

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

export default app;
