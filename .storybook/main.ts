import path from "path";

import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../packages/**/*.mdx", "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  babel: async (config, { configType }) => {
    if (configType === "DEVELOPMENT") {
      return {
        presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
      };
    } else {
      return {
        presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
        plugins: ["transform-remove-console"],
      };
    }
  },
  webpackFinal: async (config, { configType }) => {
    const { resolve = {}, module = {}, plugins = [] } = config;

    const moduleRules = module.rules ?? [];

    const rulesWithoutCss = moduleRules.filter((rule) => {
      if (rule && typeof rule === "object" && "test" in rule && rule.test instanceof RegExp) {
        return !rule.test.test(".css");
      }
      return true;
    });

    if (configType === "DEVELOPMENT") {
      plugins.push(
        new VanillaExtractPlugin({
          identifiers: "debug",
        }),
      );
    } else {
      plugins.push(
        new VanillaExtractPlugin({
          identifiers: "short",
        }),
      );
    }

    return {
      ...config,
      resolve: {
        ...resolve,
        alias: {
          ...resolve.alias,
          "@": path.resolve(__dirname, "../src"),
        },
      },
      module: {
        ...module,
        rules: [
          ...rulesWithoutCss,
          {
            test: /\.vanilla\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  url: false,
                },
              },
              "postcss-loader",
            ],
          },
        ],
      },
      plugins: [...plugins, new MiniCssExtractPlugin()],
    };
  },
};
export default config;
