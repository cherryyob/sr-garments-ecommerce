const fs = require("fs").promises;
const path = require("path");
const pathRoot = require("../utils/pathUtil");
const { json } = require("stream/consumers");
const root = path.join(pathRoot, "data", "bagItemList.json");

module.exports = class bagModel {
  constructor(id) {
    this.id = id;
  }
  async save() {
    console.log("save");
    try {
      await fs.writeFile(root, JSON.stringify(this.id));
    } catch (err) {
      err && console.log(err);
    }
  }
};
