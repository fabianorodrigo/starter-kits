import express from "express";
import {UFController} from "../controllers";
import {authBearerStrategyMiddleware} from "../middlewares";

const UFRouter = express.Router();

// middleware logging especificado para rota /person
UFRouter.get("/:id", /*logging,*/ UFController.getById);
UFRouter.post("/search", UFController.get);
UFRouter.post("/", UFController.post);
UFRouter.put("/", UFController.put);
//DELETE está protegido pela autenticação (estratégia Bearer)
UFRouter.delete("/:id", authBearerStrategyMiddleware, UFController.delete);

export {UFRouter};
