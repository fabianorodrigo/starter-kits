"use strict";
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import sequelizeConnection from "../../config";
import {UF} from "./uf";

// order of InferAttributes & InferCreationAttributes is important.
export class City extends Model<
  InferAttributes<City>,
  InferCreationAttributes<City>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare code: number;
  declare dv: number;
  declare name: string;

  // foreign keys are automatically added by associations methods (like City.belongsTo)
  // by branding them using the `ForeignKey` type, `City.init` will know it does not need to
  // display an error if ownerId is missing.
  declare codeUF: ForeignKey<UF["code"]>;
  // `uf` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare uf?: NonAttribute<UF>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

City.init(
  {
    code: {
      type: DataTypes.NUMBER,
      field: "cd_municipio",
      allowNull: false,
      primaryKey: true,
    },
    dv: {
      type: DataTypes.NUMBER,
      field: "cd_dv_municipio",
      allowNull: false,
    },
    name: {type: DataTypes.STRING, field: "nm_municipio", allowNull: false},
    codeUF: {
      type: DataTypes.STRING,
      field: "cd_uf",
      allowNull: false,
    },
    // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
    // but the typings of Model.init do not know this. Add the following to mute the typing error:
    createdAt: DataTypes.DATE,
    updatedAt: {type: DataTypes.DATE, allowNull: true},
  },
  {
    sequelize: sequelizeConnection,
    tableName: "ta_municipio",
  }
);
