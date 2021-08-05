const { asClass, Lifetime } = require("awilix");
const ImageService = require("./ImageService");
const Router = require("./ImageRouter");
const moduleIsActive = require("../../modules.config").image;

module.exports = {
  load(container) {
    if (moduleIsActive) {
      container.register({
        imageService: asClass(ImageService, { lifetime: Lifetime.SINGLETON }),
      });

      const app = container.resolve("expressApp");
      app.use("/api/v1/images", Router);
    }
  },
};
