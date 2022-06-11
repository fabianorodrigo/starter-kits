import express from "express";
import {PersonController} from "../controllers";

const PersonRouter = express.Router();

// People
const personCtl = new PersonController();
PersonRouter.get("/:id", personCtl.getById.bind(personCtl));
PersonRouter.post("/search", personCtl.get.bind(personCtl));
PersonRouter.post("/", personCtl.post.bind(personCtl));
PersonRouter.put("/", personCtl.put.bind(personCtl));
PersonRouter.delete("/:id", personCtl.delete.bind(personCtl));

export default PersonRouter;
