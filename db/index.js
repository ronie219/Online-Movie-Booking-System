const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/movie-tickets-api";

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
