const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  number: {
    type: String,
    required: [true, "Mobile Phone must be included"],
    unique: true,
    lowercase: true,
    validate: [
      (val) => {
        if (val.length !== 12) {
          return false;
        }

        return true;
      },
      "Mobile Phone must be a valid one",
    ],
  },
  username: {
    type: String,
    require: [true, "this field is required to fill"],
    validate: [
      (val) => {
        if (val.length > 12) {
          return false;
        }
        return true;
      },
      "Max character is 12",
    ],
  },
  password: {
    type: String,
    required: [true, "Password must be included"],
    minlength: [8, "Minimal password length must be 8 character"],
  },
  admin: {
    type: Boolean,
    required: [true, "This field is required to fill"],
  },
});

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

adminSchema.statics.login = async function (number, password) {
  const admin = await this.findOne({ number });

  if (admin) {
    const auth = password == admin.password ? true : false;

    if (auth) {
      if (admin.admin) {
        return admin;
      }
      throw Error(`You're not an Admins`);
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Mobile Phone or Mobile Phone is not registered");
};

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
