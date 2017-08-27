/* eslint-disable import/unambiguous */
module.exports = function createRules(NODE_ENV) {
    const PROD = (NODE_ENV || "development") === "production";
    return [
        {
            test: /\.jsx?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            rules: [
                {
                    use: [
                        "classnames-loader",
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: PROD ? "[hash:base64:6]" : "[name]-[local]--[hash:base64:3]",
                            },
                        },
                        "less-loader",
                    ],
                },
            ],
        },
        {
            test: /\.json$/,
            exclude: /node_modules/,
            rules: [
                {
                    use: ["json-loader"],
                },
            ],
        },
        {
            test: /\.css$/,
            include: /react-ui/,
            rules: [
                {
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                localIdentName: PROD ? "[hash:base64:6]" : "[name]-[local]--[hash:base64:3]",
                            },
                        },
                    ],
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
            include: /react-ui/,
            use: ["file-loader"],
        },
        {
            test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
            exclude: /node_modules/,
            use: ["file-loader"],
        },
    ];
};
