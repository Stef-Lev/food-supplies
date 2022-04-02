const MainRouter = require("express").Router();

MainRouter.route("/router1").get(require("./router1.js"));
MainRouter.route("/router2").get(require("./router2.js"));

module.exports = MainRouter;
