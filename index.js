global.Promise = require("bluebird");
const { startSrever, stopServer } = require("./server");

function launchAndCatchError(func) {
  return () =>
    func().catch((err) => {
      console.log(err);
    });
}

process.on('SIGINT', launchAndCatchError(() => stopServer(true)))
process.on('SIGTERM', launchAndCatchError(() => stopServer(true)))

launchAndCatchError(() => startSrever())();
