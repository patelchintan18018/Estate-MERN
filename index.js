const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute")

mongoose
  .connect(process.env.MONGODATABASE)
  .then(() => console.log("Database connected ...."))
  .catch((err) => console.log("Unable to connect database ..." , err));

const app = express();

app.use('/api' , userRoute);


app.listen(3000, () => {
  console.log("Server is running on 3000 !!!!");
});
