import express from "express";
import {CityController} from "../controllers";
import {authBearerStrategyMiddleware} from "../middlewares";

const CityRouter = express.Router();

// middleware logging especificado para rota /person
CityRouter.get("/:id", /*logging,*/ CityController.getById);
CityRouter.post("/search", CityController.get);
CityRouter.post("/", CityController.post);
CityRouter.put("/", CityController.put);
//DELETE está protegido pela autenticação (estratégia Bearer)
CityRouter.delete("/:id", authBearerStrategyMiddleware, CityController.delete);

export {CityRouter};
