const Sequelize = require("sequelize");

class Address extends Sequelize.Model {}

module.exports = (sequelize) => {
  Address.init(
    {
      country: Sequelize.DataTypes.STRING,
      region: Sequelize.DataTypes.STRING,
      city: Sequelize.DataTypes.STRING,
      houseNumber: Sequelize.DataTypes.INTEGER,
      street: Sequelize.DataTypes.STRING,
    },
    { sequelize, paranoid: false, timestamps: true, tableName: "Address" }
  );
  Address.associate = () => {
    const db = sequelize.models;
    db.Address.belongsToMany(db.User, { through: db.UserAddress });
  };
  return Address;
};
