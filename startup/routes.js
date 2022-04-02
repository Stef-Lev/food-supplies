require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
var indexRouter = require("../routes/index");
var router1Router = require("../routes/router1");
var router2Router = require("../routes/router2");

module.exports = function (app) {
  const urlEncodedParser = bodyParser.urlencoded({ extended: false });
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json(), urlEncodedParser);
  app.use("/", indexRouter);
  app.use("/router1", router1Router);
  app.use("/router2", router2Router);

  if (process.env.NODE_ENV === "production") {
    const root = require("path").resolve(__dirname, "client", "build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root });
    });
  } else {
    app.get("/", (req, res) => {
      res.send("API running");
    });
  }
};
