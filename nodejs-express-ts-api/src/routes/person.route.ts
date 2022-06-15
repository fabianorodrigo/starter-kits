import express from "express";
import {PersonController} from "../controllers";
import {logging} from "../middlewares";

const PersonRouter = express.Router();

// People
const personCtl = new PersonController();
// middleware logging especificado para rota /person
PersonRouter.get("/:id", logging, personCtl.getById.bind(personCtl));
PersonRouter.post("/search", personCtl.get.bind(personCtl));
// TODO: testar se essa forma abaixo funciona para substituir as duas linhas subsequentes
// PersonRouter.post("/", personCtl.post.bind(personCtl)).put("/", personCtl.put.bind(personCtl));
PersonRouter.post("/", personCtl.post.bind(personCtl));
PersonRouter.put("/", personCtl.put.bind(personCtl));
PersonRouter.delete("/:id", personCtl.delete.bind(personCtl));

export {PersonRouter};
