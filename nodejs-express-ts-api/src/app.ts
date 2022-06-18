import cors from "cors";
import express, {Request, Response} from "express";
import session from "express-session";
import {
  initAuthBearerStrategy,
  initAuthLocalStrategy,
  initAuthTwitterStrategy,
} from "./auth";
import {
  AuthRouter,
  PersonRouter,
  UFRouter,
  UserGitHubRouter,
  UserRouter,
} from "./routes/";

// init express
const app = express();
// Uso de sessão foi exigido pela autenticação via Twitter
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// init local and bearer strategies authentication via passport
initAuthLocalStrategy();
initAuthBearerStrategy();
initAuthTwitterStrategy();

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
//home
app.get("/home", (req: Request, res: Response) => {
  res.status(200).send("You're home");
});

// Authentication
app.use("/", AuthRouter);
// User
app.use(`/user`, UserRouter);
// Person
app.use(`/person`, PersonRouter);
// UFsd
app.use(`/uf`, UFRouter);
// Users GitHub
app.get("/usergithub/", UserGitHubRouter);

export default app;
