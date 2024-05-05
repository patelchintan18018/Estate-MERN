const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGODATABASE)
  .then(() => console.log("Database connected ...."))
  .catch((err) => console.log("Unable to connect database ..." , err));

const app = express();

app.listen(3000, () => {
  console.log("Server is running on 3000 !!!!");
});
