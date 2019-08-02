const express = require("express");
const cors = require("cors");
const { CLIENT_ORIGIN, DB_CONNECTION } = require("./config");

const mongoose = require("mongoose");
require("./models/event");

const indexRouter = require("./routes/index");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can't connect to the database" + err);
  }
);

const corsOptions = {
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", indexRouter);

app.listen(process.env.PORT || 5000, () => console.log("OK"));
