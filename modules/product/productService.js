const fs = require("fs");

module.exports = class Product {
  constructor({ postgresDBConnection, awsS3Service }) {
    this.db = postgresDBConnection;
    this.perPage = 2;
    this.awsS3Service = awsS3Service;
  }

  async create(req, userId) {
    const file = req.files[0];
    const { name, price, category } = req.body;
    const filePath = file.path;
    const fileName = Date.now() + file.originalname.replace(/ /g, "-");
    await this.awsS3Service.uploadImage(filePath, fileName);
    return await this.db.Product.create({
      name,
      price,
      category,
      main_image: fileName,
      userId,
    });
  }

  async update(productId, req) {
    const fields = req.body;
    const user = await this.db.Product.findOne({ where: { id: productId } });
    if (!user) {
      throw new Error("Product does not exists");
    }
    return await this.db.Product.update(
      { ...fields },
      { where: { id: productId } }
    );
  }

  async getAll(page = null) {
    const p = page ? page : 1;
    const result = await this.db.Product.findAndCountAll({
      offset: (page - 1) * this.perPage,
      limit: this.perPage,
      include: {
        model: this.db.User,
      },
    });
    const total = result.count;
    const pagesNumber = Math.ceil(total / this.perPage);
    const paginator = {
      total,
      pagesNumber,
      next: page < pagesNumber,
      prev: page > 1 && page <= pagesNumber,
    };
    return { paginator, rows: result.rows };
  }

  async getProduct(productId) {
    return await this.db.Product.findOne({
      where: { id: productId },
      include: this.db.User,
    });
  }

  async delete(productId) {
    return await this.db.Product.destroy({
      where: { id: productId },
      include: this.db.User,
    });
  }
};
