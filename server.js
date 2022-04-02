require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8088;
const mongoose = require("mongoose");
const database = process.env.MONGODB_URI;

mongoose.connect(database);
const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log(`Database was connected...`);
});

require("./startup/routes")(app);

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
