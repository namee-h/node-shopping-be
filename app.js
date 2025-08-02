const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();

require("dotenv").config();

const LOCAL_DB_ADDRESS = process.env.LOCAL_DB_ADDRESS;
const PROD_DB_ADDRESS = process.env.PROD_DB_ADDRESS;
const PORT = process.env.PORT || 8000;
const mongoURI = PORT === 8000 ? LOCAL_DB_ADDRESS : PROD_DB_ADDRESS;
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
