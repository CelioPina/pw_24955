import Sequelize from "sequelize";

const Vinil_DB = new Sequelize("Vinil_DB", "celio", "1234", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export { Vinil_DB };
