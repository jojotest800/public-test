const { asClass, Lifetime } = require("awilix");
const StripeService = require("./stripeService");
module.exports = {
  load(container) {
    container.register({
      stripeService: asClass(StripeService, { lifetime: Lifetime.SINGLETON }),
    });
  },
};
