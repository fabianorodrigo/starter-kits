"use strict";
import {Dialect, Sequelize} from "sequelize";
import {CONFIG} from "./database";

const env = process.env.NODE_ENV || "development";
const config = CONFIG[env];

const sequelizeConnection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect as Dialect,
  }
);

export default sequelizeConnection;

// import {readdirSync} from "fs";
// import {basename as _basename, join} from "path";
// import Sequelize, {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
// const basename = _basename(__filename);
// const env = process.env.NODE_ENV || "development";
// // eslint-disable-next-line @typescript-eslint/no-var-requires
//
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const model = require(join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
