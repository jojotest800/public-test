const { asClass, Lifetime } = require("awilix");
const Service = require("./addresService");
const Router = require("./addressRouter");
const moduleIsActive = require("../../modules.config").address;

module.exports = {
  load(container) {
    if (moduleIsActive) {
      container.register({
        addressService: asClass(Service, { lifetime: Lifetime.SINGLETON }),
      });

      const app = container.resolve("expressApp");
      app.use("/api/v1/addresses", Router);
    }
  },
};
