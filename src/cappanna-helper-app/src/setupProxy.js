const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:3900/" }));
  app.use(proxy("/hubs", { target: "http://localhost:3900/", ws: true }));
};
