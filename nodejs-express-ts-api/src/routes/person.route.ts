import express from "express";
import {PersonController} from "../controllers";

const PersonRouter = express.Router();

// People
const personCtl = new PersonController();
PersonRouter.get("/:id", personCtl.getById.bind(personCtl));
PersonRouter.post("/search", personCtl.get.bind(personCtl));
// TODO: testar se essa forma abaixo funciona para substituir as duas linhas subsequentes
// PersonRouter.post("/", personCtl.post.bind(personCtl)).put("/", personCtl.put.bind(personCtl));
PersonRouter.post("/", personCtl.post.bind(personCtl));
PersonRouter.put("/", personCtl.put.bind(personCtl));
PersonRouter.delete("/:id", personCtl.delete.bind(personCtl));

export default PersonRouter;
