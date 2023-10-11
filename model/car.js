const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const car_Schema = new Schema({
  car_name: String,
  reg_year: String,
  kms:Number,
  fuel_type:String,
  car_photo : String
});

const CAR = mongoose.model('car',car_Schema);

module.exports = CAR;