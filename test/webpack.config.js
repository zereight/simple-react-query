
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.(tsx|ts|js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic"
                  }
                ],
                "@babel/preset-typescript",
              ],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "css", "scss"]
  },
  devtool: "source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};
