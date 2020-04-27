import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      Components: path.resolve(__dirname, "src/components"),
      Assets: path.resolve(__dirname, "src/assets"),
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
        test: /\.(tsx)$/,
        use: ["eslint-loader"],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
  ],
};

export default config;
