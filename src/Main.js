const {checkSudo, checkNodeVersion, checkPlatform, checkPlatformExact} = require('./Util');

if (!checkSudo()) {
  throw new Error("You need to be root to run this package.");
};

if (!checkNodeVersion()) {
  throw new Error(`The Node version must be at least v14 or above.`);
};

if (!checkPlatform()) {
  throw new Error("Your platform must be at least `linux`.");
};

if (!checkPlatformExact()) {
  throw new Error("node-ufw only supported on Ubuntu.");
};

module.exports = {
  name: require("../package.json").name,
  version: require("../package.json").version,
  allow: require("./methods/allow"),
  deny: require("./methods/deny"),
  disable: require("./methods/disable"),
  enable: require("./methods/enable"),
  status: require("./methods/status"),
  delete: require("./methods/delete"),
  reset: require("./methods/reset"),
  reload: require("./methods/reload"),
  logging: require("./methods/logging")
};