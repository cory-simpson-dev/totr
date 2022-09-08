const mongoose = require('mongoose')

const CheckinSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  comment:{
    type: String,
    required: true
  },
  favDish:{
    type: String
  },
  status: {
    type: String,
    default: "public",
    enum:["public","private"]
  },
  foodType:{
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
})

module.exports = mongoose.model('Checkin', CheckinSchema)