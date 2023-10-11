const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
  uname: String,
  date:String,
  Mobile:Number,
  car_name:String,
  Query:String,
  email:String
});

const INQUIRY = mongoose.model('inquiry',inquirySchema);

module.exports = INQUIRY;