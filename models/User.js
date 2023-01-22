const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isMobilePhone } = require("validator");

const userSchema = mongoose.Schema({
  number: {
    type: String,
    required: [true, "Mobile Phone must be included"],
    unique: true,
    lowercase: true,
    validate: [
      (val) => {
        const result = isMobilePhone(val, ["id-ID"]);
        return result;
      },
      "Mobile Phone must be a valid one",
    ],
  },

  username: {
    type: String,
    required: [true, "Username is Required"],
    validate: [
      (val) => {
        if (val.length > 12) {
          return false;
        }

        return true;
      },
      "Max Character Username is 12 and Must be Alphabet",
    ],
  },

  password: {
    type: String,
    required: [true, "Password must be included"],
    minlength: [8, "Minimal password length must be 8 character"],
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

  profile: {
    name: {
      type: String,
    },

    Buffer: {
      type: Buffer,
    },

    createdAt: {
      type: String,
      default: new Date(),
    },

    size: {
      type: Number,
    },

    type: {
      type: String,
    },
  },

  lastActive: {
    type: String,
    required: false,
  },

  certificate: {
    type: Boolean,
    default: false,
  },

  created: {
    type: String,
    default: new Date().toISOString(),
  },
});

// hashing password before storing to db using mongo hooks
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// create login method for login
userSchema.statics.login = async function (number, password) {
  const user = await this.findOne({ number });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Mobile Phone or Mobile Phone is not registered");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
