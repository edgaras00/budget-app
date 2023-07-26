const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_CONNECT, {
//   logging: console.log,
// });

const sequelize = new Sequelize(process.env.DB_CONN, {
  logging: console.log,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, testDbConnection };
