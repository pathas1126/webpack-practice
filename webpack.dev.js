const merge = require("webpack-merge");
const common = require("./webpack.common");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const config = {
  mode: "development",
  devServer: {
    open: true,
    overlay: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/subpage$/,
          to: "subpage.html",
        },
        {
          from: /./, // '.': 특정 경로를 제외한 모든 경로를 의미
          to: "404.html",
        },
      ],
    },
    port: 3000,
  },
  plugins: [new StyleLintPlugin()],
};

module.exports = merge(common, config);
