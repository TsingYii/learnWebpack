/* eslint-disable no-undef */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },    
    mode: 'development',//模式
    entry: {
        home:'./src/home/index.js',
        find: './src/find/index.js'
    },//入口
    output: {//出口
        filename: '[name].js',
        path: path.resolve(__dirname,'dist'),
        // publicPath: 'http://www.yf.com'
    },
    plugins: [//插件
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            title: '主页',
            template: './src/mytemplate.ejs',
            filename: 'home.html',
            templateParameters: {
                des: '我是主页'
            },
            chunks:['home'],
            minify:false
        }),
        new HtmlWebpackPlugin({
            title: '发现页',
            filename: 'find.html',
            template: './src/mytemplate.ejs',
            templateParameters: {
                des: '我是发现页'
            },
            chunks:['find'],
            minify:false
        }),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ],
    devServer: {//调试配置
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            { test: /\.(css|less)$/, use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                "postcss-loader"
            ] 
            },
            {
                test: /\.(jpg|png|webp|jpeg|gif)$/,
                use: {
                    loader:'url-loader',
                    options:{
                        esModule:false,
                        limit:9000,
                        name: 'img/[name].[hash:8].[ext]',
                        publicPath: 'http://www.yf.com'
                    },
                   
                }
            }
        ]
    }
};