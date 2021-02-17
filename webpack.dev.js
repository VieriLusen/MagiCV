const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contentHash].js",
  },
  module: {
    rules: [
      {
        /* CSS Loader using Style Loader*/
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
