import path from "path";

import type { Configuration } from "webpack";

import "webpack-dev-server";

export const getBaseWebpackConfig = (workspacePath: string): Configuration => {
  return {
    entry: path.resolve(__dirname, `../${workspacePath}/index.ts`),
    output: {
      path: path.resolve(__dirname, `../${workspacePath}/dist`),
      filename: "[contenthash].bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.vanilla\.css$/i,
          use: [
            {
              loader: require.resolve("css-loader"),
              options: {
                url: false,
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
  };
};
