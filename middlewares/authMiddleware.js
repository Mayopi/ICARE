require("dotenv").config;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //validate if user have jwt token and verified
  if (token) {
    jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
      if (err) {
        console.log("Access Denied, Token Not Verified!");
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    console.log("Access Denied, Token Not Found!");
    res.redirect("/login");
  }
};

const requireAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.redirect("/login");
    return;
  }

  jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
    if (err) {
      console.log(err);
    }

    const admin = await Admin.findById(decodedToken.id);

    try {
      if (admin.admin) {
        next();
      }
    } catch (error) {
      res.redirect("/dashboard");
    }
  });
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
        return user;
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkIsAdmin = (req, res, next) => {
  const { isAdminChecked } = req.body;

  if (isAdminChecked) {
    return true;
    next();
  } else {
    return false;
    next();
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
  checkUser,
  checkIsAdmin,
};
