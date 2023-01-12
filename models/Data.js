const { mongo } = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  certificateGenerated: {
    amount: {
      type: Number,
      default: 0,
      validate: [
        (val) => {
          if (val < 0) {
            return false;
          }
          return true;
        },
        "Total of certificate generated cannot minus",
      ],
    },
    createAt: {
      type: String,
      default: new Date().toDateString(),
    },
  },

  colorblindTest: {
    amount: {
      type: Number,
      default: 0,
      validate: [
        (val) => {
          if (val < 0) {
            return false;
          }
          return true;
        },
        "Total colorblind test taken cannot minus",
      ],
    },
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
  },

  visualEyeTest: {
    amount: {
      type: Number,
      default: 0,
      validate: [
        (val) => {
          if (val < 0) {
            return false;
          }
          return true;
        },
        "Total eye test taken cannot minus",
      ],
    },

    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
  },
});

const Data = mongoose.model("data", dataSchema);

module.exports = Data;
