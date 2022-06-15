import cors from "cors";
import express from "express";
import {PersonRouter, UserGitHubRouter, UserRouter} from "./routes/";
import {initAuthLocalStrategy, initAuthBearerStrategy} from "./auth";

// init express
const app = express();
// init local and bearer strategies authentication via passport
initAuthLocalStrategy();
initAuthBearerStrategy();

// Enable CORS
app.use(cors());
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

/********************** CUSTOM MIDDLEWARES **********************************/
// middleware usado sem especificar rota, ou seja, roda em todas. Por outro lado,
// também receberá o req.params vazio. Para pegar os path params, é necessário
// especificar rota aqui ou lá nos routes
//app.use(logging);

/*************************** ROUTES  ****************************************/
// User
app.use(`/user`, UserRouter);
// Person
app.use(`/person`, PersonRouter);
// Users GitHub
app.get("/usergithub/", UserGitHubRouter);

export default app;
