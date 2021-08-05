const { asClass, Lifetime } = require("awilix");
const Scheduler = require("./cronService");

module.exports = {
  load(container) {
    container.register({
      cronService: asClass(Scheduler, { lifetime: Lifetime.SINGLETON }),
    });
  },
};
