const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reting_Schema = new Schema({
  reting: Number,
  name: String
});

const RETING = mongoose.model('reting',reting_Schema);

module.exports = RETING;