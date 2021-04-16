const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Cannot Use Password Keyword. ");
        }
      },
    },
    age: {
      required: true,
      type: Number,
      validate(value) {
        if (value <= 0) {
          throw new Error("Please Enter the valid age");
        }
      },
    },
    role: {
      type: String,
      default: "basic",
    },
    email: {
      required: true,
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid Email");
        }
      },
    },
    avatar: {
      default: null,
      type: Buffer,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("booking", {
  foreignField: "user",
  localField: "_id",
  ref: "Booking",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, "abhishekbiswas");
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("There is no Such User");
  }
  const isMatched = await bycrpt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Please enter the correct password");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bycrpt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
