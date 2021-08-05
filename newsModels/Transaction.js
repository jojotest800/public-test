const Sequelize = require("sequelize");

class Transaction extends Sequelize.Model {}

module.exports = (sequelize) => {
  Transaction.init(
    {
      userId: Sequelize.DataTypes.STRING,
      process: Sequelize.DataTypes.STRING,
      UserId: Sequelize.DataTypes.STRING,
      status: Sequelize.DataTypes.STRING,
      type: Sequelize.DataTypes.STRING,
      payment_intent: Sequelize.DataTypes.INTEGER,process
    },
    { sequelize, paranoid: false, timestamps: true, tableName: "Transaction" }
  );
  Transaction.associate = () => {
    const db = sequelize.models;
    db.Transaction.belongsTo(db.User);
  };
  return Transaction;
};
