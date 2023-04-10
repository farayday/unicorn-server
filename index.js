const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { Unicorn } = require("./model/unicorn.js");

const upload = multer();
const app = express();
app.use(cors());
app.use(upload.none());

app.use("/search/:type", (req, res, next) => {
  if (req.body.filterName && req.body.filterWeight) {
    req.projection = { _id: 0, name: 1, weight: 1 };
  } else if (req.body.filterName) {
    req.projection = { _id: 0, name: 1 };
  } else if (req.body.filterWeight) {
    req.projection = { _id: 0, weight: 1 };
  }
  next();
});

app.post("/search/name", async (req, res) => {
  const results = await Unicorn.find({ name: req.body.name }, req.projection);
  res.json(results);
});

app.post("/search/weight", async (req, res) => {
  const results = await Unicorn.find(
    { weight: { $gte: req.body.lower, $lte: req.body.upper } },
    req.projection
  );
  res.json(results);
});

app.post("/search/food", async (req, res) => {
  const choices = [];
  if (req.body.apple) {
    choices.push("apple");
  }
  if (req.body.carrot) {
    choices.push("carrot");
  }
  const results = await Unicorn.find(
    { loves: { $all: choices } },
    req.projection
  );
  res.json(results);
});

mongoose
  .connect(
    "mongodb+srv://aliu150:lcEHIZgP7bF5BBae@unicornsearch.gmhaqiv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.error(err);
  });
