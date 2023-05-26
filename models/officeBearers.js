const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BearersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    image: {
      type: String,
      required: true,
    },
  designations: {
    type: String,
    required: true,
  },
  massage: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("officeBearers", BearersSchema);
