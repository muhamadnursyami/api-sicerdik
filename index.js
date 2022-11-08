const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");

mongoose.connect(
  "mongodb+srv://sami:vDEb5bUJpD9Gn4Rg@cluster0.isysebr.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello JWT");
});

app.use("/auth", require("./routes/registerRoutes"));
const PORT = process.env.PORT || 4000;
app.listen(PORT);
