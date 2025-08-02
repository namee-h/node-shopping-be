const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
const MONGODB_URI_LOCAL = process.env.LOCAL_DB_ADDRESS;
const MONGODB_URI_PROD = process.env.PROD_DB_ADDRESS;
const PORT = process.env.PORT || 8080;
const mongoURI = PORT === 8080 ? MONGODB_URI_LOCAL : MONGODB_URI_PROD;
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //req.body 가 객체로 인식됨

app.use("/api", indexRouter);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
