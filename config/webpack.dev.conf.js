const {resolve} = require('path')
//引入html处理的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
//引入webpack 准备实例化插件 热更新模块
const webpack = require('webpack')

module.exports = {
    //暴露 entry output loader plugins
    entry: ["./src/main.js", "./src/index.html"],
    //loader
    module: {
        rules: [
            //css-loader
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
            },
            //img-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        outputPath: "img",
                        publicPath: "./img",
                        name: '[hash:5].[ext]',
                        limit: 8192
                    }
                }]
            },
            //         //语法检查
            {
                test: /\.js$/, // 涵盖 .js 文件
                enforce: "pre", // 预先加载好 jshint loader
                exclude: /node_modules/,// 排除掉 node_modules 文件夹下的所有文件
                use: [
                    {
                        loader: "jshint-loader",
                        options: {
                            //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
                            //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
                            //!!!警告变为错误,黄色变成红色 方便观看
                            emitErrors: true,
                            //jshint 默认情况下不会打断webpack编译
                            //如果你想在 jshint 出现错误时，立刻停止编译
                            //请设置 failOnHint 参数为true
                            failOnHint: false,
                            esversion: 6,
                        }
                    }
                ]
            },
            //html-loader
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },
    // //plugins
    plugins: [
        //处理html文件
        new HtmlWebpackPlugin({
            title: "webpack",
            filename: "index.html",
            template: "./src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        //配置开发服务器
        hot: true, //模块热更新开启
        open: false,//自动打开浏览器
        port: 3000, //开发服务器端口
        compress: true //启动gzip
    }
}
