const { asValue } = require("awilix");
const awilix = require("awilix");
const env = require("./env");
const packageDetails = require("./package.json");

const container = awilix.createContainer();

container.register({
  env: asValue(env),
  packageDetails: asValue(packageDetails),
});

module.exports = container;
