const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  role: {
    type: String,
    require: true,
    enum: ["host", "guest"],
    default: "guest",
  },
  password: { type: String, require: [true, "password must require"] },
  email: {
    type: ["email", "email is require"],
    unique: [true, "email is already use"],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  lastName: { type: String, require: [true, "Last name must needed"] },
  firstName: { type: String, require: [true, "Enter a valid name"] },
});
module.exports = mongoose.model("userModel", userModel);
