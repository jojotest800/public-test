const { Sequelize } = require("sequelize");
const { isEmpty } = require("lodash");
require("dotenv").config();
const { modelsPath } = require("../models");

const db = {};

function dbInstance(dbHost, dbPort, dbName, username, password, options) {
  const config = {
    port: dbPort,
    dialect: "postgres",
    logging: () => {
      // console.log();
    },
    pool: { max: 5, min: 0 },
  };

  Object.assign(config, options);

  Object.assign(config, {
    host: dbHost,
  });

  return new Sequelize(dbName, username, password, config);
}

const init = async () => {
  if (db && db.sequelise) {
    return;
  }

  const sequelize = dbInstance(
    process.env.DB_HOST_PROD,
    process.env.DB_PORT_PROD,
    process.env.DB_NAME_PROD,
    process.env.DB_USER_PROD,
    process.env.DB_PASS_PROD,
    {
      database: process.env.DB_NAME_PROD,
      database: process.env.DB_USER_PROD,
      username: process.env.DB_PASS_PROD,
    }
  );

  modelsPath.forEach((model) => {
    const mod = require(model)(sequelize, Sequelize.DataTypes);
    db[mod.name] = mod;
  });

  Object.keys(db).forEach((mod) => {
    if (db[mod].associate && isEmpty(db[mod].associations)) {
      db[mod].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return Promise.resolve(db);
};

function close() {
  if (!db.sequelize) {
    return Promise.resolve("DB connexion was not opened");
  }

  return db.sequelize.close().then(() => {
    db.sequelize = null;
    db.Sequelize = null;
  });
}

module.exports = {
  init,
  db,
  close,
};
