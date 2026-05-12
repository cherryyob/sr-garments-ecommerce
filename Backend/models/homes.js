const fs = require("fs");
const path = require("path");
const pathRoot = require("../utils/pathUtil");
const root = path.join(pathRoot, "data", "items.json");
const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  idName:{type:String,require:true},
  image: { type: String, require: true },
  company: { type: String, require: true },
  item_name: { type: String, require: true },
  original_price: { type: Number, require: true },
  current_price: { type: Number, require: true },
  discount_percentage: { type: Number, require: true },
  return_period: { type: Number, require: true },
  delivery_date: { type: Date, require: true },
  rating: {
    stars: { type: Number, require: true },
    count: { type: Number, require: true },
  },
});



module.exports = mongoose.model("itemMdel", productSchema);
/*
module.exports = class homeModel {
  constructor(id, name, price, rating, photo, description) {
    ((this.id = id),
      (this.name = name),
      (this.price = price),
      (this.rating = rating),
      (this.photo = photo),
      (this.description = description));
  }
  save() {
    console.log("this is chek");
  }

  static async fatchAll(calback) {
    await fs.readFile(root, (err, data) => {
      // await new Promise((resolve, reject) => setTimeout(() => resolve(), 4000));
      calback(!err ? JSON.parse(data) : []);
    });
  }
};
*/
