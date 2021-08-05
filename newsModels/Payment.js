const Sequelize = require("sequelize");

class Payment extends Sequelize.Model {}

module.exports = (sequelize) => {
  Payment.init(
    {
      userId: Sequelize.DataTypes.STRING,
      UserId: Sequelize.DataTypes.STRING,
      amount: Sequelize.DataTypes.INTEGER,
      payment_mode: Sequelize.DataTypes.STRING,
      session: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.STRING,
      buyer_address: Sequelize.DataTypes.STRING
    },
    { sequelize, paranoid: false, timestamps: true, tableName: "Payment" }
  );
  Payment.associate = () => {
    const db = sequelize.models;
    db.Payment.belongsTo(db.User);
  };
  return Payment;
};
