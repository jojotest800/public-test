const Sequelize = require("sequelize");

class UserAddress extends Sequelize.Model {}

module.exports = (sequelize) => {
  UserAddress.init(
    {},
    { sequelize, paranoid: false, timestamps: true, tableName: "UserAddress" }
  );
  UserAddress.associate = () => {
    const db = sequelize.models;
    db.UserAddress.belongsTo(db.User);
    db.UserAddress.belongsTo(db.Address);
  };
  return UserAddress;
};
