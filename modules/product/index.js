const { asClass, Lifetime } = require("awilix");
const ProductService = require("./productService");
const Router = require("./productRouter");
const moduleIsActive = require("../../modules.config").user;

module.exports = {
  load(container) {
    if (moduleIsActive) {
      container.register({
        productService: asClass(ProductService, { lifetime: Lifetime.SINGLETON }),
      });

      const app = container.resolve("expressApp");
      app.use("/api/v1/products", Router);
    }
  },
};
