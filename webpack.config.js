const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackConfig = new HtmlWebpackPlugin({template: 'index.html'});

const HotModuleReplacementConfig = new webpack.HotModuleReplacementPlugin();


module.exports = env => {
    return {
        mode: 'none',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: { test: /node_modules/, name: "vendors", chunks: "all" }
                }
            }
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'eslint-loader',
                    enforce: 'pre'
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            HotModuleReplacementConfig,
            HtmlWebpackConfig
        ]
    }
};