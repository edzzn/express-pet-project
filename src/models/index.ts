import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, Model } from "sequelize";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
export const db: DBMain = {
  models: new Map(),
};

let sequelize: Sequelize;
if (config.use_env_variable) {
  const env_var = process.env[config.use_env_variable];
  if (!env_var) throw new Error("There was a problem loading env_var");

  sequelize = new Sequelize(env_var, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db.models.set(model.name, model);
  });

const modelsList = Array.from(db.models.entries()).map((v) => v[1]);
for (let model of modelsList) {
  if (model && model.associate) {
    model.associate(modelsList);
  }
}

db.sequelize = sequelize;

export interface DBMain {
  sequelize?: Sequelize;
  models: Map<string, AssociatedModel>;
}

export interface AssociatedModel extends Model {
  associate(models: Model<any, any>[]): void;
}
