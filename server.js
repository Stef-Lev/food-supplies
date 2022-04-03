require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const database = process.env.MONGODB_URI;
const bodyParser = require("body-parser");
const router1Router = require("./routes/router1");
const router2Router = require("./routes/router2");

mongoose.connect(database);
const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log(`Database was connected...`);
});

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json(), urlEncodedParser);

app.use("/api/router1", router1Router);
app.use("/api/router2", router2Router);

if (process.env.NODE_ENV === "production") {
  const root = require("path").resolve(__dirname, "client", "build");
  console.log("%cROOT", "font-size:30px;color:red;", root);
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
