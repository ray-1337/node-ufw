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