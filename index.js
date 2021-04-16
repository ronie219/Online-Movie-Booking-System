const express = require("express");
const app = express();
require("./db");

const userRouter = require("./routers/Users");
const movieRouter = require("./routers/Movies");
const audiRouter = require("./routers/Audi");
const timingRouter = require("./routers/Timing");
const bookingRouter = require("./routers/Booking");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(movieRouter);
app.use(audiRouter);
app.use(timingRouter);
app.use(bookingRouter);

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
