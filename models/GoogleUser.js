const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const googleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email field is required"],
    validate: [
      (val) => {
        return isEmail(val);
      },
      "Email is not valid!",
    ],
    unique: true,
  },

  email_verified: {
    type: Boolean,
    default: false,
  },

  sub: {
    type: String,
    required: [true, "sub fields is required"],
  },

  username: {
    type: String,
    required: [true, "name fields is required"],
  },

  number: {
    type: String,
    validate: [
      (val) => {
        return isMobilePhone(val);
      },
      "Invalid mobile phone",
    ],
  },

  profile: {
    name: {
      type: String,
    },

    path: {
      type: String,
    },

    Buffer: {
      type: Buffer,
    },

    name: {
      type: String,
    },

    size: {
      type: Number,
    },

    type: {
      type: String,
    },

    createdAt: {
      type: String,
      default: new Date(),
    },
  },

  lastSignIn: {
    type: String,
    default: new Date(),
  },

  createdAt: {
    type: String,
    default: new Date(),
  },

  bio: {
    type: String,
    maxlength: [160, "Maximal bio length is 160 Character"],
    default: "",
  },

  gender: {
    type: String,
    default: "None",
    validate: [
      (val) => {
        if (val !== "Male" && val !== "Female" && val !== "None") {
          return false;
        }
      },
      "Gender is not valid",
    ],
  },
});

const GoogleUser = mongoose.model("google", googleSchema);

module.exports = { GoogleUser };
