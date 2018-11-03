const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configPath = require('./loader/configPath');
const webpackBaseConfig = require('./webpack.config.base');
module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: configPath.outputPath,
        filename: '[name].js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'development'"
            }
        }),
        new HtmlWebpackPlugin({
            //title: 'ER'
            filename: configPath.outputTemplatePath,
            template: configPath.templatePath,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://127.0.0.1:8080/dist/index.html' })
    ],
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        publicPath: '/dist/',
        //热替换
        hot: true
    }
})