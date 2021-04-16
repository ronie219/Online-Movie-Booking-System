const mongoose = require("mongoose");

const showTimeSchema = mongoose.Schema({
  movie: {
    ref: "Movies",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  audi: {
    ref: "Audi",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  slot1: {
    default: false,
    type: Boolean,
  },
  slot2: {
    default: false,
    type: Boolean,
  },
  slot3: {
    default: false,
    type: Boolean,
  },
  date: {
    type: Date,
    required: true,
  },
  occupied: {
    type: Number,
    default: 0,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const ShowTiming = mongoose.model("Timing", showTimeSchema);

module.exports = ShowTiming;
