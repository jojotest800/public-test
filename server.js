const { asValue } = require("awilix");
const http = require("http");
const Promise = require("bluebird");
const { scopePerRequest } = require("awilix-express");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { postgres } = require("./db_connetions");
const bodyParser = require("body-parser");

const app = express();

let shuttingDown = false;
let httpServer;

app.use((req, res, next) => {
  if (!shuttingDown) {
    return next();
  }

  res.header("Connection", "close");
  const err = new Error("Server is in process of restarting");
  return next(err);
});

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      const url = req.originalUrl;
      if (url.startsWith("/api/v1/users/webhook")) {
        req.rawBody = buf.toString();
      }
    },
    extended: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const container = require("./container");

const env = container.resolve('env')

console.log(env.getEnvVal('NODE_ENV'))

app.use(scopePerRequest(container));

container.register({
  expressApp: asValue(app),
});

module.exports = {
  app,
  container,
  startSrever: async () => {
    const db_cons = await Promise.props({
      postgresDBCon: postgres.init(),
    });

    container.register({
      postgresDBConnection: asValue(db_cons.postgresDBCon),
    });
    require("./modules").loadModules(container);

    container.resolve("cronService").tasks();

    const httpPort = env.getEnvVal('SERVER_HTTP_PORT')
    await new Promise((resolve) => {
      httpServer = http.createServer(app).listen(httpPort, resolve);
    });

    console.log("Server started on port :", httpPort);

    return httpServer;
  },
  stopServer: async (exit) => {
    shuttingDown = true;
    const tostop = await Promise.race([
      Promise.all([
        new Promise((resolve) =>
          httpServer ? httpServer.close(resolve) : resolve()
        ),
        postgres.close(),
      ]),
      new Promise((resolve) => setTimeout(resolve, 90 * 1000, "timeout")),
    ]);
    if (tostop !== "timeout") {
      console.info("Closed out remaining connections");
      if (exit) process.exit();
      return;
    }
    console.info("Could not close in tiome, now forcing shutdown");
    if (exit) {
      process.exit(1);
    }
  },
};
