const Sequelize = require("sequelize");
const emitter = require("../modules/events");

class Product extends Sequelize.Model {}

module.exports = (sequelize) => {
  Product.init(
    {
      userId: Sequelize.DataTypes.UUID,
      UserId: Sequelize.DataTypes.UUID,
      price: Sequelize.DataTypes.INTEGER,
      name: Sequelize.DataTypes.STRING,
      category: Sequelize.DataTypes.STRING,
      main_image: Sequelize.DataTypes.STRING,
      other_images: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
    },
    {
      sequelize,
      paranoid: false,
      timestamps: true,
      tableName: "Product",
      hooks: {
        afterCreate: (product, options) => {
          emitter.emit("NEW_PRODUCT_ADDED", product);
        },
      },
    }
  );
  Product.associate = () => {
    const db = sequelize.models;
    db.Product.belongsTo(db.User);
  };
  return Product;
};
