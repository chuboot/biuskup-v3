const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/main.js",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
