const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

module.exports = function (app) {
  app.get("/api/router1", authRoute.loginUser);
  app.get("/api/router2", userRoute.add);
};
