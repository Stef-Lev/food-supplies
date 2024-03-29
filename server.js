require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const database = findDatabase(process.env.NODE_ENV);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(database);

function findDatabase(env) {
  switch (env) {
    case "production":
      return process.env.MONGODB_PROD_URI;
    case "development":
      return process.env.MONGODB_DEV_URI;
    case "demo":
      return process.env.MONGODB_DEV_URI;
    case "test":
      return process.env.MONGODB_TEST_URI;
    default:
      return process.env.MONGODB_DEV_URI;
  }
}

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
app.use(cookieParser(jwtSecret));

require("./routes/router")(app);

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

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
