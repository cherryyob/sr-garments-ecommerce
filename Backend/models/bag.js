const { mongoose } = require("mongoose");

const bagSchema = mongoose.Schema({
  bagId: { type: String, require: true, unique: true },
});
module.exports = mongoose.model("bag", bagSchema);

