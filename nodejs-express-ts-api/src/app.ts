import cors from "cors";
import express, {Request, Response} from "express";
import {initAuthBearerStrategy, initAuthLocalStrategy} from "./auth";
import {PersonRouter, UserGitHubRouter, UserRouter} from "./routes/";

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
//Shutdown
app.get("/stop", (req: Request, res: Response) => {
  process.kill(process.pid, "SIGTERM");
  res.status(200).send();
});

// User
app.use(`/user`, UserRouter);
// Person
app.use(`/person`, PersonRouter);
// Users GitHub
app.get("/usergithub/", UserGitHubRouter);

export default app;
