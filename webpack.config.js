const path = require("path");

module.exports = {
  mode: "development",
  entry: "./public/javascript/dashboard-admin.js",
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "dashboard-admin-bundle.js",
  },
  devtool: false,
};
