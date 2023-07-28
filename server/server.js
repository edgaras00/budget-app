require("dotenv").config();

const { sequelize } = require("./config/db");
const User = require("./api/models/user");
const Transaction = require("./api/models/transaction");
const Category = require("./api/models/category");
const Account = require("./api/models/account");

const app = require("./app");

User.hasMany(Account);
Account.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Account.hasMany(Transaction, { foreignKey: "accountId" });
Transaction.belongsTo(Account, {
  foreignKey: "accountId",
  onDelete: "CASCADE",
});

Category.hasMany(Transaction, { foreignKey: "categoryId" });
Transaction.belongsTo(Category, { foreignKey: "categoryId" });

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database is synchronized");

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () =>
      console.log(`Listening on PORT ${PORT}`)
    );
  } catch (error) {
    console.error("Failed syncing database", error);
  }
};

startServer();
