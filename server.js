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
const PORT = 5500;

const app = express();

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

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const container = require("./container");

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

    await new Promise((resolve) => {
      httpServer = http.createServer(app).listen(PORT, resolve);
    });

    console.log("Server started on port :", PORT);

    return httpServer;
  },
  stopServer: async (exit) => {
    const tostop = await Promise.race([
      Promise.all([
        new Promise((resolve) =>
          httpServer ? httpServer.close(resolve) : resolve()
        ),
        postgres.close()
      ]),
      new Promise((resolve) => setTimeout(resolve, 90 * 1000, "timeout")),
    ]);
    if (tostop) {
      console.log("Closing all connections");
      if (exit) process.exit();
      return;
    }
    if (exit) {
      process.exit(1);
    }
  },
};
