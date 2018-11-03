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
        //require.ensure([]) 动态引入的资源会走这个应该是
        chunkFilename: '[name].[chunkhash].js',
        publicPath: ''
    },
    //这个地方先这样，有很多配置项，一部分采用了默认的
    optimization: {
        splitChunks: {
            chunks: 'all',
            //这个地方配置一个默认的包大小
            minSize: 40000,
            // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /^node_modules$/,
                    priority: 10,
                    enforce: true
                },
                common: {
                    name: 'common',
                    test: /^components$/,
                    minChunks: 2,
                    minSize: 30000
                }
            }
        }
    },
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