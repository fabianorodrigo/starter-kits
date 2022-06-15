import cors from "cors";
import express from "express";
import {logging} from "./middlewares";
import {PersonRouter, UserGitHubRouter} from "./routes/";

const app = express();

// Enable CORS
app.use(cors());
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

/********************** CUSTOM MIDDLEWARES **********************************/
// middleware usado sem especificar rota, ou seja, roda em todas. Por outro lado,
// também receberá o req.params vazio. Para pegar os path params, é necessário
// especificar rota aqui ou lá nos routes
app.use(logging);

/*************************** ROUTES  ****************************************/
// Users GitHub
app.get("/user/", UserGitHubRouter);
// Person
app.use(`/person`, PersonRouter);

export default app;
