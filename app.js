require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const guestRoutes = require("./routes/guestRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, requireAdmin, checkUser } = require("./middlewares/authMiddleware");
const { generateRandomFunfact } = require("./utilities/functions");
const User = require("./models/User");
const Admin = require("./models/Admin");
const Data = require("./models/Data");
// const multer = require("multer");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// multer setup
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "images/png" || file.mimetype === "images/jpg" || file.mimetype === "images/jpeg") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// app.use(multer({ storage: fileStorage, fileFilter }).single("images"));

// database connection

mongoose
  .connect(process.env.PRODUCTION_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    app.listen(3000, () => {
      const { name, host } = result.connections[0];
      console.log(`Successfully connected to MongoDB ${name} hosted in ${host}`);
      console.log(`app is listening on http://localhost:3000`);
    });
  })
  .catch((err) => console.log(err));

// routes

app.get("*", checkUser);

app.get("/", async (req, res) => {
  const user = await User.find();
  const data = await Data.find();

  const certificate = (data) => {
    data = String(data);
    if (data > 999 && data < 1000000) {
      return `${data[0]}K+`;
    } else if (data > 999999 && data < 1000000000) {
      return `${data[0]}M+`;
    } else if (data > 999999999) {
      return `${data[0]}B+`;
    } else if (data > 999999999999 && data < 1000000000000) {
      return `${data[0]}T+`;
    }
    return data;
  };

  const testTaken = (colorblind, visualeyes) => {
    const data = String(colorblind + visualeyes);
    if (data > 999 && data < 1000000) {
      return `${data[0]}K+`;
    } else if (data > 999999 && data < 1000000000) {
      return `${data[0]}M+`;
    } else if (data > 999999999) {
      return `${data[0]}B+`;
    } else if (data > 999999999999 && data < 1000000000000) {
      return `${data[0]}T+`;
    }
    return data;
  };

  res.render("index", {
    funfact: generateRandomFunfact(),
    totalUser: user.length,
    user,
    certificate: certificate(data[0].certificateGenerated.amount),
    testTaken: testTaken(data[0].colorblindTest.amount, data[0].visualEyeTest.amount),
  });
});

app.use(guestRoutes, authRoutes, adminRoutes);

app.use("/", async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    const result = jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        return decodedToken;
      }
    });

    const user = await User.findById(result.id);
    const admin = await Admin.findById(result.id);

    res.render("404", {
      user,
      admin,
    });
  } else {
    res.render("404", {
      user: undefined,
      admin: undefined,
    });
  }
});
