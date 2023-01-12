require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/funfact.json";

const loadFunfact = () => {
  const load = fs.readFileSync(dataPath, "utf-8");
  const jsonify = JSON.parse(load);
  // console.log(jsonify);
  return jsonify;
};

const generateRandomFunfact = () => {
  const dataLength = loadFunfact().funfacts.length;
  const randomFunfact = Math.floor(Math.random() * dataLength);
  // console.log(randomFunfact);
  return loadFunfact().funfacts[randomFunfact];
};

module.exports = {
  generateRandomFunfact,
};
