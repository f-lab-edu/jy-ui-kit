import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { globSync } from "glob";
import webpack from "webpack";
import { mergeWithRules } from "webpack-merge";

import { getBaseWebpackConfig } from "./webpack.config.base";

import type { Configuration } from "webpack";

const webpackDevConfig: Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VanillaExtractPlugin({
      identifiers: "debug",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: "write-references",
        build: true,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};

const webpackOptions = globSync("packages/*")
  .map((path) => {
    return path.includes("types") ? undefined : path;
  })
  .flat()
  .filter((path): path is string => !!path)
  .map((path) => {
    const webpackBaseConfig = getBaseWebpackConfig(path);
    return mergeWithRules({
      module: {
        rules: {
          test: "match",
          use: {
            loader: "match",
            options: "replace",
          },
        },
      },
    })(webpackBaseConfig, webpackDevConfig) as Configuration;
  });

webpack(webpackOptions, (error, stats) => {
  const children = stats?.toJson("minimum").children;

  children?.forEach((result) => console.log(result.outputPath));
});
