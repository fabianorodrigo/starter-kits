import sequelizeConnection from "../../config";
import {City} from "./city";
import {UF} from "./uf";

export * from "./uf";
export * from "./city";
export * from "./product";

// Here we associate which actually populates out pre-declared `association` static and other methods.
City.belongsTo(UF, {foreignKey: "codeUF"}); // this configures the `codeUF` attribute tagged as `ForeignKey` in City Model
UF.hasMany(City, {foreignKey: "codeUF"});

(async () => {
  await sequelizeConnection.sync();
})();
