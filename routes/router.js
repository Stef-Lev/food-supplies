const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

module.exports = function (app) {
  // Authentication
  app.post("/api/auth/signup", authRoute.signupUser);
  app.post("/api/auth/login", authRoute.loginUser);
  app.get("/api/auth/logout", authRoute.logoutUser);
  app.get("/api/auth/user", authRoute.checkUser);
  // User
  app.get("/api/user/:id/", userRoute.getPlayerData);
  app.post("/api/user/:id/addproduct", userRoute.addListProduct);
  // Product
  app.post("/api/product/add", productRoute.add);
};
