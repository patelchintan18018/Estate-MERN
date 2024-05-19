const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cors = require("cors")

const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");
const listingRoute = require("./routes/listingRoute.js")


const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGODATABASE)
  .then(() => console.log("Database connected ...."))
  .catch((err) => console.log("Unable to connect database ..." , err));

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use('/api/user' , userRoute);
app.use('/api',authRoute);
app.use('/api/listing', listingRoute)

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use((err,req,res,next)=>{
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statuscode).json({
    success : false,
    statuscode,
    message
  })
});


app.listen(3000, () => {
  console.log("Server is running on 3000 !!!!");
});
