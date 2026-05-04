const fs = require("fs");
const path = require("path");
const pathRoot = require("../utils/pathUtil");
const root = path.join(pathRoot, "data", "items.json");
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
  static saveBagItem(id) {}
  static async fatchAll(calback) {
    await fs.readFile(root, (err, data) => {
      // await new Promise((resolve, reject) => setTimeout(() => resolve(), 4000));
      calback(!err ? JSON.parse(data) : []);
    });
  }
  static async fetchBag() {}
};
