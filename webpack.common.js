const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: "postcss.config.js",
    },
  },
};
const isProduction = process.env.isProduction === "PRODUCTION";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              "sass-loader",
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              postcssLoader,
              "sass-loader",
            ],
          },
        ],
      },
      {
        test: /\.hbs$/i,
        use: ["handlebars-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: isProduction ? "[contenthash].[ext]" : "[path][name].[ext]",
              publicPath: "assets/",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        charset: "UTF-8",
        viewport: "width=device-width, initial-scale=1.0",
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
