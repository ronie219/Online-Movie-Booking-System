const mongoose = require("mongoose");

const Timing = require("./ShowTiming");

const bookingSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movies",
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    validate(value) {
      if (value <= 0) {
        throw new Error("Enter Correct seat");
      }
    },
    required: true,
  },
  audi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audi",
  },
  slot: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

bookingSchema.methods.findMovieAndBookSeat = async function () {
  const ticket = this;
  const result = (
    await Timing.find({ date: ticket.date, movie: ticket.movie })
  )[0];

  if (result) {
    if (
      result[ticket.slot] === true &&
      result.capacity - result.occupied >= ticket.seats
    ) {
      result.occupied += ticket.seats;
      ticket["audi"] = result.audi;
      ticket["slot"] = result.slot;
      await result.save();
      return ticket;
    }
    return undefined;
  }
  return undefined;
};

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
