import { Sequelize } from "sequelize";
import { UserModel } from "./User";

export const sequelize = new Sequelize(
  process.env.MODULE_5_DATABASE_URL || "",
  {
    logging: false,
  }
);

export const User = UserModel(sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});
