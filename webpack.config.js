const path = require("path");

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
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
                "@babel/preset-typescript"
              ],
              plugins: ["@babel/transform-runtime"]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  mode: "production",
  devtool: "source-map"
};

module.exports = config;
