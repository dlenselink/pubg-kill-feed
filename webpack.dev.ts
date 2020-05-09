import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const { CheckerPlugin } = require('awesome-typescript-loader');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
});

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      Components: path.resolve(__dirname, "src/components"),
      Utils: path.resolve(__dirname, "src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: {
          esModule: false,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.(js|ts)x$/,
        use: ["eslint-loader"],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
  ],
};

export default config;
