const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONN, {
  logging: console.log,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    if (error instanceof Sequelize.Error) {
      console.log("Sequelize error:", error.message);
      console.log("Original database error:", error.parent.message);
    } else {
      console.log("Error", error);
    }
  }
};

module.exports = { sequelize, testDbConnection };
