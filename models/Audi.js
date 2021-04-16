const mongoose = require("mongoose");

const audiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!value.toLowerCase().includes("audi")) {
        throw new Error("String Contain Audi");
      }
    },
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Number,
    default: 0,
  },
});

const Audi = mongoose.model("Audi", audiSchema);
module.exports = Audi;
