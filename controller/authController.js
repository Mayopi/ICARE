require("dotenv").config();
const User = require("../models/User");
const Admin = require("../models/Admin");
const Data = require("../models/Data");
const { GoogleUser } = require("../models/GoogleUser");
const jwt = require("jsonwebtoken");
const { generateCertificateColorblind } = require("../middlewares/certificate");
const { isMobilePhone } = require("validator");

// Handle errors function

// middlewares

const { googleLogin } = require("../middlewares/googleLogin");

const { verifyJWTToken } = require("../middlewares/authMiddleware");

const handleErrors = (err, username, password) => {
  let errors = { number: "", username: "", password: "", confirmPassword: "", admin: "" };

  console.log(err.code, err.message);

  //validate errors from user login
  if (err.message == "Incorrect Mobile Phone or Mobile Phone is not registered") {
    errors.number = err.message;
  }

  if (err.message == "Incorrect Password") {
    errors.password = err.message;
  }

  if (err.message == "Password are not matching!") {
    errors.confirmPassword = err.message;
  }

  if (err.message == "You're not an Admins") {
    errors.admin = err.message;
  }

  //validate duplicate user
  if (err.code === 11000) {
    errors.number = "Phone Number is already registered!";
    return errors;
  }

  if (err.message == "Phone Number is already registered!") {
    errors.number = err.message;
  }

  //validate if any errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const profileUserHandler = (err) => {
  const errors = { username: "", number: "", gender: "", bio: "" };

  if (err.message == "Phone number are not valid!") {
    errors.number = err.message;
  }

  if (err.message == "Gender is not valid!") {
    errors.gender = err.message;
  }

  if (err.message == "Max bio length is 160 character") {
    errors.bio = err.message;
  }

  return errors;
};

// last sign in middlewares
const lastSignIn = async (number) => {
  await User.updateOne(
    { number },
    {
      lastActive: new Date().toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    }
  );
};

//create jwt token
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGNATURE, {
    expiresIn: maxAge,
  });
};

// routes get method
module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
  });
  res.redirect("/");
};

module.exports.certificate_get = async (req, res, next) => {
  const token = req.cookies.jwt;
  const result = jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
    if (err) console.log(err);
    return decodedToken;
  });
  let user = await User.findById(result.id);

  if (!user) {
    user = await GoogleUser.findById(result.id);
  }

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline;filename=ICARE-colorblindness-certificate-${user.username}.pdf`,
  });

  const colorBlindResult = req.cookies.result;
  generateCertificateColorblind(req, res, colorBlindResult, user);

  const certificateGenerated = await Data.find();

  await user.updateOne({
    certificate: true,
  });

  if (certificateGenerated.length < 1) {
    await Data.create({
      amount: 0,
    });
  } else {
    let currentData = certificateGenerated[0].certificateGenerated.amount;

    await Data.updateOne({ _id: certificateGenerated[0]._id }, { "certificateGenerated.amount": currentData + 1 });
  }
};

// service get

module.exports.color_blind_test_get = async (req, res) => {
  res.render("colorblind");
};

module.exports.visual_eye_test_get = async (req, res) => {
  res.render("visual-eye-test");
};

// dashboard get

module.exports.dashboard_get = async (req, res, next) => {
  const token = req.cookies.jwt;
  const user = await verifyJWTToken(token);

  let buffer = user?.profile?.Buffer ?? false;

  if (buffer) {
    buffer = user.profile.Buffer.toString("base64");
  }

  res.render("dashboard", {
    user,
    buffer,
  });
};

module.exports.dashboard_admin_get = async (req, res) => {
  const user = await User.find();
  res.render("dashboard-admin", {
    user: user.length,
  });
};

module.exports.manage_user_get = async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const user = await User.find();
  const totalUser = user.length;
  const dataPerPage = 20;
  const totalPage = Math.ceil(totalUser / dataPerPage);

  const skipIndex = dataPerPage * page - dataPerPage;

  const showUser = await User.find().skip(skipIndex).limit(dataPerPage);

  res.render("manage-user", {
    user: showUser,
    totalPage,
    allUser: user,
    currentPage: page,
    today: new Date().toLocaleString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  });
};

module.exports.delete_user_get = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    const result = await User.deleteOne({ _id: user._id });
    if (!result) {
      throw new Error("Failed to delete user");
    }
    res.redirect("/manage-user");
  } catch (error) {
    console.log(error);
  }
};

module.exports.update_user_get = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("update-user", {
    user,
  });
};

module.exports.profile_user_get = async (req, res) => {
  const token = req.cookies.jwt;
  const result = jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      return decodedToken;
    }
  });
  const user = (await User.findById(result.id)) ?? (await GoogleUser.findById(req.params.id));

  let buffer = user?.profile?.Buffer ?? false;

  if (buffer) {
    buffer = user.profile.Buffer.toString("base64");
  }

  res.render("profile-user", {
    user,
    id: result.id,
    buffer,
  });
};

module.exports.profile_user_settings_get = async (req, res) => {
  const user = (await User.findById(req.params.id)) ?? (await GoogleUser.findById(req.params.id));

  const buffer = user.profile.Buffer.toLocaleString("base64");

  res.render("user-settings", {
    user,
    buffer,
  });
};

module.exports.show_certificate_get = async (req, res) => {
  const userID = req.params.id;

  let user = await User.findById(userID);

  // if (!user) {
  //   user = await GoogleUser.findById(result.id);
  // }

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline;filename=ICARE-colorblindness-certificate-${user.username}.pdf`,
  });

  const colorBlindResult = req.cookies.result;
  generateCertificateColorblind(req, res, colorBlindResult, user);
};

// routes post method

module.exports.signup_post = async (req, res) => {
  // username update
  const { number, username, password, confirmPassword } = req.body;
  // username update

  try {
    // username update
    const matchedPassword = password === confirmPassword ? true : false;

    if (!matchedPassword) {
      throw new Error("Password are not matching!");
    }
    const user = await User.create({
      number,
      username,
      password,
      lastActive: new Date().toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
    // username update
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error, username, password);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { number, password, confirmPassword, credential } = req.body;

  if (credential) {
    try {
      const user = await googleLogin(credential);
      const token = createToken(user[0]._id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      // res.status(200).json({ user });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    try {
      const user = await User.login(number, password);

      lastSignIn(number);

      const token = createToken(user._id);
      res.cookie("jwt", token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
      });
      res.status(200).json({ user: user._id });
    } catch (error) {
      const errors = handleErrors(error, password, confirmPassword);
      res.json({ errors });
    }
  }
};

module.exports.profile_user_post = async (req, res) => {
  try {
    console.log(req.body);
    const { username, gender, number, bio } = req.body;
    const profile = req.file;
    const userID = req.params.id;

    const user = (await User.findOne({ _id: userID })) ?? (await GoogleUser.findOne({ _id: userID }));

    if (!profile) {
      await user.updateOne({
        username,
        gender,
        number,
        bio,
      });
      res.status(200).json({ user: user._id });
    } else {
      await user.updateOne({
        username,
        gender,
        number,
        bio,
        "profile.Buffer": profile.buffer,
        "profile.name": profile.originalname,
        "profile.type": profile.mimetype,
        "profile.size": profile.size,
        "profile.createdAt": new Date().toLocaleString(),
      });
      res.status(200).json({ user: user._id });
    }
  } catch (error) {
    console.log(error);
    const errors = profileUserHandler(error);
    res.status(400).json({ errors });
  }
};

module.exports.admin_login_post = async (req, res) => {
  const { number, password } = req.body;

  try {
    const admin = await Admin.login(number, password);
    const token = createToken(admin._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id });
  } catch (error) {
    const errors = handleErrors(error, password);
    // console.log(errors);
    res.json({ errors });
  }
};

module.exports.update_user_post = async (req, res) => {
  const { username, number, credential } = req.body;

  try {
    const result = await User.updateOne(
      { number: credential.number },
      {
        username,
        number,
      }
    );

    res.status(200).json({ result });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Mobile Phone already been Registered";
      res.status(400).json({ error: error.message });
    } else {
      console.log(error);
    }
  }
};

module.exports.search_user_post = async (req, res) => {
  const { keyword } = req.body;

  let user = await User.find({ username: keyword });

  try {
    if (user.length < 1 && keyword === "") {
      const user = await User.find();
      const page = 1;
      const totalUser = user.length;
      const dataPerPage = 20;
      const totalPage = totalUser / dataPerPage;
      const skipIndex = dataPerPage * page - dataPerPage;

      const showUser = await User.find().skip(skipIndex).limit(dataPerPage);

      res.send({ user: showUser, totalPage });
    } else if (user.length < 1 && keyword !== "") {
      throw Error("User Not Found!");
    } else {
      res.send({ user });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};
