const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //req.body 가 객체로 인식됨

app.use("/api", indexRouter);

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"));
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
