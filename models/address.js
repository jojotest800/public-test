"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return Address;
};
