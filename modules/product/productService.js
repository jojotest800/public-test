const fs = require("fs");
const faker = require("faker");
const uuid = require("uuid");
const bluebird = require("bluebird");

module.exports = class Product {
  constructor({ postgresDBConnection, awsS3Service }) {
    this.db = postgresDBConnection;
    this.perPage = 2;
    this.awsS3Service = awsS3Service;
  }

  async create(req, userId) {
    // const file = req.files[0];
    // const { name, price, category } = req.body;
    // const filePath = file.path;
    // const fileName = Date.now() + file.originalname.replace(/ /g, "-");
    // await this.awsS3Service.uploadImage(filePath, fileName);
    for (let i = 0; i < 1000; i++) {
      await this.db.Product.create({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        category: faker.name.title.name,
        main_image: faker.image.imageUrl(),
        userId: uuid.v4(),
      });
    }
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

  async processSeparate() {
    const total = 100;
    const filesize = 200;

    const totalFound = await this.db.Product.count({});

    const steps = Math.ceil(totalFound / filesize);

    const skips = [];
    let results = [];

    for (let i = 0; i < steps; i++) {
      skips.push(i * filesize);
    }

    for (const skip of skips) {
      const offsetLimit = totalFound - skip;
      console.log("skips ", skips);

      const countLoop = Math.ceil(
        (offsetLimit < filesize ? offsetLimit : filesize) / total
      );
      const ar = [];
      for (let j = 0; j < countLoop; j++) {
        ar.push(j * total);
      }

      await bluebird
        .reduce(ar, (temp, skipNumber) => {
          console.log("skip number in reduce :", skipNumber+ skip, ar, countLoop);
          return this.db.Product.findAll({
            limit: total,
            offset: skip,
          });
        })
        .then((prods) => {
          // console.log(prods)
          results.push(prods);
        });
    }

    return { totalFound, steps, skips, products: results };
  }
};
