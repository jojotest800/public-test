const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true,
      },
      firstName: Sequelize.DataTypes.STRING,
      nberProducts: Sequelize.DataTypes.INTEGER,
      lastName: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailVerified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { sequelize, paranoid: false, timestamps: true, tableName: "User" }
  );
  User.associate = () => {
    const db = sequelize.models;
    db.User.belongsToMany(db.Address, { through: db.UserAddress });
    db.User.hasMany(db.Product);
    db.User.hasMany(db.Transaction);
  };
  return User;
};
