const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils } = require("rumsan-core");

const schema = mongoose.Schema(
  {
    lookup: String,
    type: String,
    field: String,
    source: String
  },
  {
    collection: "hackcheck",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("HackCheck", schema);

class Controller {
  check(lookup) {
    lookup = lookup.trim();
    lookup = lookup.replace("+", "");
    lookup = lookup.replace("977", "");
    lookup = lookup.replace(/-/g, "");
    return model.find({ lookup: { $regex: new RegExp(RSUtils.Text.escapeRegex(lookup), "gi") } }).distinct("source");
  }
}

module.exports = new Controller();
