const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils } = require("rumsan-core");
const moment = require("moment");

const schema = mongoose.Schema(
  {
    ip: String,
    search: String,
    is_hacked: Boolean
  },
  {
    collection: "hackcheck_log",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("HackCheckLog", schema);

class Controller {
  add(payload) {
    return model.create(payload);
  }
  async count(date) {
    let data = [];
    if (date) {
      const selDate = moment(date, "YYYY-MM-DD").startOf("day");
      data = await model.find({
        created_at: {
          $gte: selDate.toDate(),
          $lte: moment(selDate).endOf("day").toDate()
        }
      });
    } else {
      data = await model.find({});
    }

    return {
      hacked: data.filter(d => d.is_hacked).length,
      not_hacked: data.filter(d => !d.is_hacked).length,
      total: data.length
    };
  }
}

module.exports = new Controller();
