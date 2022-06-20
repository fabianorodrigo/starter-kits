import {Request, Response} from "express";
import {NotFoundError} from "../../customErrors";
import {ApplicationError} from "../../customErrors/ApplicationError";
import {IServerError} from "../../model";
import {City} from "../../sequelize";

export class CityController {
  private static readonly NOT_FOUND_ERROR: IServerError = {
    message: `City not found`,
  };

  /**
   * Reads one entity from the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  static async getById(
    req: Request,
    res: Response<City | IServerError>
  ): Promise<void> {
    try {
      const result = await City.findByPk(req.params.code as string);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(CityController.NOT_FOUND_ERROR);
      }
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        res.status(404).json(CityController.NOT_FOUND_ERROR);
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
  static async get(
    req: Request,
    res: Response<ReadonlyArray<City> | IServerError>
  ): Promise<void> {
    try {
      const where: {[key: string]: string} = {};
      if (req.body) {
        Object.keys(req.body).forEach((key) => {
          where[key] = req.body[key];
        });
      }

      res
        .status(200)
        .json(
          await City.findAll({where: where, include: [City.associations.UF]})
        );
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        res.status(404).json(CityController.NOT_FOUND_ERROR);
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
    req: Request<City>,
    res: Response<City | IServerError>
  ): Promise<void> {
    try {
      const result = await City.create(req.body);
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
    req: Request<City>,
    res: Response<City | IServerError>
  ): Promise<void> {
    try {
      if (!(await City.findByPk(req.body.code))) {
        res.status(404).json(CityController.NOT_FOUND_ERROR);
      }
      const result = await City.update(req.body, {
        where: {code: req.body.code},
      });
      if (result[0] > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: unknown) {
      if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
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
      if (!(await City.findByPk(req.body.code))) {
        res.status(404).json(CityController.NOT_FOUND_ERROR);
      }
      const result = await City.destroy({
        where: {code: req.body.code},
      });
      if (result > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: unknown) {
      if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: (<Error>e).message});
      }
      return;
    }
  }
}
