const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { Sequelize } = require("sequelize");

const Category = require("../api/models/category");

const insertCategories = async () => {
  const sequelize = new Sequelize(process.env.DB_CONN, {
    logging: console.log,
  });
  try {
    await sequelize.authenticate();
    console.log("connected");

    const categories = [
      { name: "subscriptions" },
      { name: "groceries" },
      { name: "household" },
      { name: "utilities" },
      { name: "income" },
      { name: "savings" },
      { name: "transportation" },
      { name: "healthcare" },
      { name: "education" },
      { name: "charity" },
      { name: "misc" },
      { name: "food" },
      { name: "clothing" },
      { name: "entertainment" },
      { name: "travel" },
      { name: "pets" },
      { name: "childcare" },
      { name: "hygiene" },
      { name: "technology" },
      { name: "sports" },
    ];
    const createdCategories = await Category.bulkCreate(categories);
    console.log(createdCategories);
  } catch (error) {
    console.log(error);
  }
};

insertCategories();
