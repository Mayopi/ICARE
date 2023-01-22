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
const { GoogleUser } = require("./models/GoogleUser");
const { certificate, testTaken } = require("./utilities/data");

// const multer = require("multer");

const app = express();

// middleware
app.use(express.static("public"));
app.use("/profile-user/:id", express.static("public"));
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
  .connect(process.env.DEVELOPMENT_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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
  try {
    const user = await User.find();
    const googleUser = await GoogleUser.find();
    const data = await Data.find();

    if (data.length < 1) {
      Data.create({ colorblindTest: 0, visualEyeTest: 0, certificateGenerated: 0 });
    }

    res.render("index", {
      funfact: generateRandomFunfact(),
      totalUser: user.length + googleUser.length,
      user,
      certificate: certificate(data[0].certificateGenerated.amount),
      testTaken: testTaken(data[0].colorblindTest.amount, data[0].visualEyeTest.amount),
    });
  } catch (error) {}
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
