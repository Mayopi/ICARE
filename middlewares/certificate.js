require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PDFDocument = require("pdfkit");

// const { finalResult } = require("../public/javascript/color-blind");

//Colorblind Certificate

// Create Certificate PDF
const generateCertificateColorblind = async (req, res, colorBlindResult) => {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
  });

  const token = req.cookies.jwt;

  const decodedToken = jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
    return decodedToken;
  });

  const user = await User.findById(decodedToken.id);

  doc.pipe(res);

  //get date
  const today = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let date = new Date();
  let getMonth = date.getMonth() + 3;
  getMonth = getMonth * 28 * 24 * 60 * 60 * 1000;
  date = date.getTime();
  date += getMonth;

  const expireDate = new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  doc
    .moveTo(15, 15)
    .lineWidth(2)
    .lineTo(15, doc.page.height - 15)
    .lineTo(doc.page.width - 15, doc.page.height - 15)
    .lineTo(doc.page.width - 15, 15)
    .lineTo(15, 15)
    .fill("#eaeaea")
    .strokeOpacity(0.8)
    .stroke("#2a2550");

  doc
    .fillColor("#2a2550")
    .fontSize(30)
    .font("./public/fonts/ProductSans-Bold.ttf")
    .text("CERTIFICATE", {
      align: "center",
      characterSpacing: 5,
    })
    .moveDown(0.5);
  doc
    .fillColor("#2a2550")
    .fontSize(15)
    .font("./public/fonts/ProductSans-Bold.ttf")
    .text("THIS CERTIFICATE IS PROOF THAT", {
      align: "center",
      characterSpacing: 2,
    })
    .moveDown(2);
  doc.fillColor("#2a2550").fontSize(40).font("./public/fonts/Montserrat-Bold.ttf").text(`${user.username.toUpperCase()}`, {
    align: "center",
    characterSpacing: 5,
  });
  doc.image("./public/img/colorblind-certificate-img/component-1.png", 0, -10, {
    width: 250,
    height: 230,
  });
  doc.image("./public/img/colorblind-certificate-img/component-2.png", 635, 450, {
    width: 250,
    height: 250,
  });
  doc.image("./public/img/icare-logo.png", doc.page.width - 185, 20, {
    width: 50,
    height: 50,
  });
  doc.image("./public/img/logo.png", doc.page.width - 130, 20, {
    width: 100,
    height: 50,
  });

  //grid guide for custom vector
  // doc
  //   .moveTo(doc.page.width, doc.page.height / 2 - 10)
  //   .lineTo(doc.page.width - 200, doc.page.height / 2 - 10)
  //   .stroke();

  // triagle vector

  doc
    .moveTo(200, doc.page.height / 2 - 70)
    .lineTo(200, doc.page.height / 2 - 100)
    .lineTo(180, doc.page.height / 2 - 85)
    .lineTo(200, doc.page.height / 2 - 70)
    .fill("#34b3f1")
    .stroke();

  doc
    .moveTo(doc.page.width - 200, doc.page.height / 2 - 70)
    .lineTo(doc.page.width - 200, doc.page.height / 2 - 100)
    .lineTo(doc.page.width - 180, doc.page.height / 2 - 85)
    .lineTo(doc.page.width - 200, doc.page.height / 2 - 70)
    .fill("#34b3f1")
    .stroke();

  // end of triangle vector

  doc
    .lineWidth(3)
    .moveTo(250, doc.page.height / 2 - 60)
    .lineTo(doc.page.width - 250, doc.page.height / 2 - 60)
    .stroke("#2a2550");

  doc
    .fillColor("#2a2550")
    .fontSize(15)
    .font("./public/fonts/ceraround-bold.otf")
    .text(`${colorBlindResult}`, doc.page.width / 2 - 200, 250, {
      width: 400,
      align: "justify",
    });

  // Date and signature line
  doc.moveTo(150, 400).lineTo(300, 400).stroke();
  doc
    .moveTo(doc.page.width - 150, 400)
    .lineTo(doc.page.width - 300, 400)
    .stroke();

  // end of Date and Signature line

  // Date and signature text

  doc
    .fontSize(12)
    .font("./public/fonts/ceraround.otf")
    .text(today, doc.page.width - 300, 370, {
      width: 150,
      align: "center",
    });

  doc
    .fontSize(15)
    .font("./public/fonts/ceraround-bold.otf")
    .text("Date", doc.page.width - 300, 410, {
      width: 150,
      align: "center",
    });

  doc
    .fontSize(12)
    .font("./public/fonts/ceraround.otf")
    .text(`Valid until: ${expireDate}`, doc.page.width - 300, 450, {
      width: 175,
      align: "left",
    });

  doc.fontSize(15).font("./public/fonts/ceraround-bold.otf").text("Eri Danianto", 150, 410, {
    width: 150,
    align: "left",
  });

  doc.fontSize(12).font("./public/fonts/ceraround.otf").text("Founder", 150, 430, {
    width: 150,
    align: "left",
  });

  doc.fontSize(12).font("./public/fonts/ceraround.otf").text("Chief Executive Officer", 150, 450, {
    width: 150,
    align: "left",
  });

  doc.fontSize(12).font("./public/fonts/ceraround.otf").text("ICARE Indonesia", 150, 470, {
    width: 150,
    align: "left",
  });

  // end of date  and signature text

  // 90 degree component

  doc
    .moveTo(15, 420)
    .lineTo(30, 440)
    .lineTo(30, doc.page.height - 30)
    .lineTo(200, doc.page.height - 30)
    .lineTo(220, doc.page.height - 15)
    .lineTo(15, doc.page.height - 15)
    .lineTo(15, 420)
    .lineTo(30, 440)
    .fill("#333")
    .stroke();

  // end of 90 degree component

  doc.end();
};

module.exports = {
  generateCertificateColorblind,
};
