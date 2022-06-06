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
  app.get("/api/user/:uid", userRoute.getPlayerData);
  app.get("/api/user/:uid/list/:listid", userRoute.getListData);
  app.get("/api/user/:uid/getlists", userRoute.getUserLists);
  app.post("/api/user/:uid/addlist", userRoute.addList);
  app.post("/api/user/:uid/addproduct/:listid", userRoute.addListProduct);
  app.delete("/api/user/:uid/deletelist/:listid", userRoute.removeList);
  app.delete(
    "/api/user/:uid/list/:listid/product/:pid",
    userRoute.removeListProduct
  );
  app.put("/api/user/:uid/editlist/:listid", userRoute.updateList);
  // Product
  app.post("/api/product/add", productRoute.add);
  app.all("*", (req, res, next) => {
    res.send("404");
  });
};
