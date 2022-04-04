const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

module.exports = function (app) {
  app.get("/api/router1", authRoute.loginUser);
  app.get("/api/router2", userRoute.add);

  // Authentication
  app.post("/api/auth/signup", authRoute.signupUser);
  app.post("/api/auth/login", authRoute.loginUser);
  app.get("/api/auth/logout", authRoute.logoutUser);
  app.get("/api/auth/user", authRoute.checkUser);
};
