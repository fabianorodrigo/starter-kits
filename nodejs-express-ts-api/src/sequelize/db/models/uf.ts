"use strict";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {IUF} from "../../../model";

import sequelizeConnection from "../../config";

// order of InferAttributes & InferCreationAttributes is important.
export class UF
  extends Model<InferAttributes<UF>, InferCreationAttributes<UF>>
  implements IUF
{
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection,
    tableName: "ta_unidade_federacao",
  }
);

(async () => {
  await sequelizeConnection.sync();
})();
