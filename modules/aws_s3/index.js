const { asClass, Lifetime } = require("awilix");
const AWSS3Service = require("./AWSS3Service");

module.exports = {
  load(container) {
    container.register({
      awsS3Service: asClass(AWSS3Service, { lifetime: Lifetime.SINGLETON }),
    });
  },
};
