const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const configPath = require('./loader/configPath');
const webpackBaseConfig = require('./webpack.config.base');
module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        path: configPath.outputPath,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: ''
    },
    // optimization: {
    //     splitChunks: {

    //     }
    // },

    devtool: false,
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'"
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new HtmlWebpackPlugin({
            filename: configPath.outputTemplatePath,
            template: configPath.templatePath,
            inject: 'body',
            chunksSortMode: 'dependency'
        })
    ]
})