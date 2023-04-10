const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  dob: Date,
  loves: [String],
  weight: Number,
  gender: String,
  vampires: Number,
});

const Unicorn = model("Unicorn", schema);

exports.Unicorn = Unicorn;
