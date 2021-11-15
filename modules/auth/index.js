const { asClass, Lifetime } = require("awilix");
const Auth = require("./authService");
const Router = require('./authRouter')

module.exports = {
  load(container) {
    container.register({
      authService: asClass(Auth, { lifetime: Lifetime.SINGLETON }),
    });

    const app = container.resolve("expressApp");
    app.use("/api/v1/auth", Router);
  },
};
