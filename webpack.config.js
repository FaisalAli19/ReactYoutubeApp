var webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: [
        "script-loader!jquery/dist/jquery.min.js",
        "script-loader!foundation-sites/dist/js/foundation.min.js",
        "./App/App.js"
    ],
    externals: {
        jquery: "jQuery"
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    resolve: {
        modules: [
            "node_modules",
            "./App/components",
            "./App/api"
        ],
        alias:{

        },
        extensions: [" ", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        stats: "errors-only"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        })
    ]
};
