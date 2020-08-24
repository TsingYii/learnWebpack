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
        path: path.resolve(__dirname,'dist')
    },
    plugins: [//插件
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            title: '主页',
            template: './src/mytemplate.html',
            filename: 'home.html',
            templateParameters: {
                des: '我是主页'
            },
            chunks:['home'],
            minify:{
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: '发现页',
            filename: 'find.html',
            template: './src/mytemplate.html',
            templateParameters: {
                des: '我是发现页'
            },
            chunks:['find'],
            minify:{
                collapseWhitespace: true
            }
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
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            // { test : /\.js$/,
            //     use: 'eslint-loader',
            //     exclude: [
            //         /lib/,
            //         /node_modules/
            //     ],
            //     include: path.resolve(__dirname,'./src')
            // },
            { test: /\.(css|less)$/, use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                "postcss-loader"
            ] 
            },
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose-loader',
            //     options: {
            //         exposes: ['$', 'jQuery'],
            //     },
            // },
        ]
    }
};