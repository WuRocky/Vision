const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/", // required for font loading on historyApiFallback
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },

    devServer: {
        compress: true,
        port: 3000,
        allowedHosts: ["all"],
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },

    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "/img",
                            outputPath: "/img",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
        ],
    },
};
