import {Request, Response} from "express";
import {Op} from "sequelize";
import {NotFoundError} from "../../customErrors";
import {ApplicationError} from "../../customErrors/ApplicationError";
import {IServerError} from "../../model";
import {Product} from "../../sequelize";

export class ProductController {
  private static readonly NOT_FOUND_ERROR: IServerError = {
    message: `Product not found`,
  };

  /**
   * Reads one entity from the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  static async getById(
    req: Request,
    res: Response<Product | IServerError>
  ): Promise<void> {
    try {
      const {id} = req.params;
      const result = await Product.findByPk(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(ProductController.NOT_FOUND_ERROR);
      }
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        res.status(404).json(ProductController.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
    }
  }

  /**
   * Reads entities from the database accordingly with the filter.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  static async filter(
    req: Request,
    res: Response<ReadonlyArray<Product> | IServerError>
  ): Promise<void> {
    try {
      const {filter} = req.query;
      const where =
        !filter || filter == ""
          ? {}
          : {
              where: {
                [Op.or]: [
                  {name: {[Op.iLike]: `%${filter}%`}},
                  {code: {[Op.iLike]: `%${filter}%`}},
                ],
              },
            };

      res.status(200).json(await Product.findAll(where));
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        res.status(404).json(ProductController.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
    }
  }

  /**
   * Writes a new entity to the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity created
   */
  static async post(
    req: Request<Product>,
    res: Response<Product | IServerError>
  ): Promise<void> {
    try {
      const result = await Product.create(req.body);
      res.status(201).json(result);
    } catch (e: unknown) {
      if (e instanceof ApplicationError) {
        res.status(400).json({message: (<Error>e).message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
      return;
    }
  }

  /**
   * Update an entity in the database.
   *
   * @param {Request<T>} req Request
   * @param {T|IServerError} res The entity updated
   */
  static async put(
    req: Request<Product>,
    res: Response<Product | IServerError>
  ): Promise<void> {
    try {
      const {id} = req.body;
      if (!(await Product.findByPk(id))) {
        res.status(404).json(ProductController.NOT_FOUND_ERROR);
      }
      const result = await Product.update(req.body, {
        where: {id: id},
      });
      if (result[0] > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: unknown) {
      if (e instanceof ApplicationError) {
        res.status(400).json({message: (<Error>e).message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
      return;
    }
  }

  /**
   * Delete an entity from the database.
   *
   * @param {Request<T>} req Request
   * @param {T|IServerError} res The entity when found
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.body;
      if (!(await Product.findByPk(id))) {
        res.status(404).json(ProductController.NOT_FOUND_ERROR);
      }
      const result = await Product.destroy({
        where: {id: id},
      });
      if (result > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: unknown) {
      if (e instanceof ApplicationError) {
        res.status(400).json({message: (<Error>e).message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
      return;
    }
  }
}
