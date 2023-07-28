const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 20],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 20],
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
    validate: {
      isIn: [["admin", "user"]],
    },
  },
});

User.defaultScope = {
  attributes: {
    exclude: ["password"],
  },
};

User.beforeCreate(async (user) => {
  console.log(user);
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
