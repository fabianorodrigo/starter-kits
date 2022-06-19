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
export class UF extends Model<
  InferAttributes<UF>,
  InferCreationAttributes<UF>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare code: string;
  declare name: string;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

UF.init(
  {
    code: {
      type: DataTypes.STRING,
      field: "cd_uf",
      allowNull: false,
      primaryKey: true,
    },
    name: {type: DataTypes.STRING, field: "nm_uf", allowNull: false},
    // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
    // but the typings of Model.init do not know this. Add the following to mute the typing error:
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection,
    tableName: "ta_unidade_federacao",
  }
);
