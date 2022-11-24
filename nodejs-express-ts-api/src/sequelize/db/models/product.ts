"use strict";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelizeConnection from "../../config";

// order of InferAttributes & InferCreationAttributes is important.
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare code: number;
  declare name: string;
  declare price: number;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    name: {type: DataTypes.STRING, allowNull: false},
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
    // but the typings of Model.init do not know this. Add the following to mute the typing error:
    createdAt: DataTypes.DATE,
    updatedAt: {type: DataTypes.DATE, allowNull: true},
  },
  {
    sequelize: sequelizeConnection,
  }
);
