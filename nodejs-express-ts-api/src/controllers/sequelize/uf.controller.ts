import {Request, Response} from "express";
import {NotFoundError} from "../../customErrors";
import {ApplicationError} from "../../customErrors/ApplicationError";
import {IServerError} from "../../model";
import {UF} from "../../sequelize";

export class UFController {
  private static readonly NOT_FOUND_ERROR: IServerError = {
    message: `UF not found`,
  };

  /**
   * Reads one entity from the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  static async getById(
    req: Request,
    res: Response<UF | IServerError>
  ): Promise<void> {
    try {
      const result = await UF.findByPk(req.params.code as string);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      }
    } catch (e: any) {
      if (e instanceof NotFoundError) {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
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
    res: Response<ReadonlyArray<UF> | IServerError>
  ): Promise<void> {
    try {
      let result = [];
      if (req.body.filter && req.body.filter.attribute) {
        const k = req.body.filter.attribute;
        const v = req.body.filter.value;
        //TODO: filtrar via Sequelize
        result = await UF.findAll();
        if (result.length > 0) {
          type IPersonKey = keyof typeof result[0];
          result = result.filter((row) => {
            return;
            (row[k as IPersonKey] as string)
              .toString()
              .toLocaleLowerCase()
              .indexOf(v.toString().toLocaleLowerCase()) > -1;
          });
        }
      } else {
        result = await UF.findAll();
      }
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      }
    } catch (e: any) {
      if (e instanceof NotFoundError) {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
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
    req: Request<UF>,
    res: Response<UF | IServerError>
  ): Promise<void> {
    try {
      const result = await UF.create(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
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
    req: Request<UF>,
    res: Response<UF | IServerError>
  ): Promise<void> {
    try {
      if (!(await UF.findByPk(req.body.code))) {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      }
      const result = await UF.update(req.body, {
        where: {code: req.body.code},
      });
      if (result[0] > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
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
      if (!(await UF.findByPk(req.body.code))) {
        res.status(404).json(UFController.NOT_FOUND_ERROR);
      }
      const result = await UF.destroy({
        where: {code: req.body.code},
      });
      if (result > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(400).json(req.body);
      }
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
      return;
    }
  }
}
