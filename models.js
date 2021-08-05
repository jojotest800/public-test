const fs = require("fs");
const path = require("path");

// const { mo } = require("./models");

const modelsPath = fs
  .readdirSync(`${__dirname}/newsModels`)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .map((f) => path.join(`${__dirname}/newsModels`, f));

const modelsInit = (sequelize, schema) => {
  const models = {};

  fs.readdirSync(`${__dirname}/newsModels`)
    .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach((f) => {
      if (sequelize.models[f]) return;
      const model = sequelize.import(
        path.resolve(`${__dirname}/newsModels/${f}`)
      );
      model._schema = shema || "public";
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (
      models[modelName].associate &&
      isEmpty(models[modelName].associations)
    ) {
      models[modelName].associate(models);
    }
  });

  return models;
};

module.exports = { modelsPath, modelsInit };
