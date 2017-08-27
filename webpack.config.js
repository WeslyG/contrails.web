/* eslint-disable import/unambiguous */
const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const createRules = require("./build/rules.js");
const { extensions, createAliases } = require("./build/resolve.js");

//const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        index: [
            "react-hot-loader/patch",
            "webpack-dev-server/client?http://localhost:3000",
            "babel-polyfill",
            "./src/index.js",
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].js",
    },
    module: {
        rules: createRules(),
    },
    resolve: {
        extensions: extensions,
        alias: createAliases(),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin([
            {
                from: "./build/testing.web.config",
                to: "web.config",
            },
        ]),
    ],
    devServer: {
        proxy: {
            "/api": {
                target: "http://logsearchapi.dev.kontur:30002",
                pathRewrite: { "^/api": "" },
            },
        },
        allowedHosts: "localhost",
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
};
