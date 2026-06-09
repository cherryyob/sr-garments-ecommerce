const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["host", "guest"],
    default: "guest",
  },
  password: { type: String, require: [true, "password must require"] },
  email: {
    type: String,
    required: [true, "email must needed"],
    unique: [true, "email is already use"],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  lastname: { type: String, require: [true, "Last name must needed"] },
  firstname: { type: String, require: [true, "Enter a valid name"] },
  userData: {
    cart: { type: [String], unique: true, default: [] },
    Addresses: { type: Object, default: {} },
    payment: { type: String, default: "" },
    orders: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
  },
});
module.exports = mongoose.model("userModel", userModel);
