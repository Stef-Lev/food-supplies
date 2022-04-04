require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const database = process.env.MONGODB_URI;
const bodyParser = require("body-parser");
const userAuth = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const jwtSecret = process.env.JWT_SECRET;

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
