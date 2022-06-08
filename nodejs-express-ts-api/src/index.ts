import cors from "cors";
import express from "express";
import {UserDTO} from "./model/user.interface";
import getUserData from "./userService";

const app = express();
app.use(cors());
const port = 3000;

const cache: {[key: string]: UserDTO} = {};

app.get("/", async (req, res) => {
  const name = req.query["username"] as string;
  console.log("name", name);
  if (!cache.hasOwnProperty(name)) {
    console.log(`WE HAD TO FETCH`);
    cache[name] = await getUserData(name);
  }
  res.json(cache[name]);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
