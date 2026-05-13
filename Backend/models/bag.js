const { mongoose } = require("mongoose");

const bagSchema = mongoose.Schema({
  bagId: { type: String, require: true, unique: true },
});
module.exports = mongoose.model("bag", bagSchema);

/*
module.exports = class bagModel {
  constructor(id) {
    this.id = id;
  }
  async save() {
    let allBagData = [];
    const fileContaint = await fs.readFile(root, "utf8");
    allBagData = JSON.parse(fileContaint);

    try {
      if (!allBagData.includes(this.id)) {
        allBagData.push(this.id);
        await fs.writeFile(root, JSON.stringify(allBagData));
        return allBagData;
      } else console.log("this id is already :", this.id);
    } catch (err) {
      err && console.log(err);
    }
  }
  static async saveAllToBag(listItem) {
    await fs.writeFile(root, JSON.stringify(listItem));

    return listItem;
  }

  static async fetchAllBag() {
    try {
      const fileContaint = await fs.readFile(root, "utf8");

      return JSON.parse(fileContaint);
    } catch (err) {
      console.log("error while fetching from bag", err);
    }
  }
};
*/
