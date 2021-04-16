const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  gerere: {
    type: Array,
  },
  duration: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
});

const Movies = mongoose.model("Movies", movieSchema);
module.exports = Movies;
