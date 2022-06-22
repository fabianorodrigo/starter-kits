import express from "express";
import {ProductController} from "../controllers";
import {authBearerStrategyMiddleware} from "../middlewares";

const ProductRouter = express.Router();

// middleware logging especificado para rota /person
ProductRouter.get("/:id", /*logging,*/ ProductController.getById);
ProductRouter.post("/search", ProductController.get);
ProductRouter.post("/", ProductController.post);
ProductRouter.put("/", ProductController.put);
//DELETE está protegido pela autenticação (estratégia Bearer)
ProductRouter.delete(
  "/:id",
  authBearerStrategyMiddleware,
  ProductController.delete
);

export {ProductRouter};
