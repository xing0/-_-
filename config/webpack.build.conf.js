
const {resolve} = require('path')
//引入插件 提取css为单独文件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
//引入html处理的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
//引入清除dist文件夹的插件
const CleanWebpaPlugin = require("clean-webpack-plugin")

module.exports = {
    //暴露 entry output loader plugins
    entry:["./src/main.js","./src/index.html"],

    output: {
        path:resolve(__dirname,'../build'),
        filename:'index.js'
    },
    //loader
    module: {
        rules: [
            //css-loader
            {
                test:/\.styl$/,
                use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:["css-loader","stylus-loader"]
                })
            },
            //img-loader
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        outputPath:"img",
                        publicPath:"./img",
                        name:'[hash:5].[ext]',
                        limit:8192
                    }
                }]
            },
    //         //语法检查
            {
                test:/\.js$/, // 涵盖 .js 文件
                enforce: "pre", // 预先加载好 jshint loader
                exclude: /node_modules/,// 排除掉 node_modules 文件夹下的所有文件
                use:[
                    {
                        loader: "jshint-loader",
                        options:{
                            //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
                            //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
                            //!!!警告变为错误,黄色变成红色 方便观看
                            emitErrors:true,
                            //jshint 默认情况下不会打断webpack编译
                            //如果你想在 jshint 出现错误时，立刻停止编译
                            //请设置 failOnHint 参数为true
                            failOnHint:false,
                            esversion: 6,
                        }
                    }
                ]
            },
            //js转ES5
            {
              test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query:{
                  presets:[
                      require.resolve('babel-preset-es2015')
                  ]
                }
            },
            //html-loader
            {
                test:/\.html$/,
                use:["html-loader"]
            }
        ]
    },
    // //plugins
    plugins: [
        //合并css文件为单一文件
        new ExtractTextWebpackPlugin("./css/index.css"),
        //处理html文件
        new HtmlWebpackPlugin({
            title:"webpack",
            filename:"index.html",
            template:"./src/index.html"
        }),
        //清理build目录
        new CleanWebpaPlugin({
            path:'./build',
            root:resolve(__dirname,'../')
        })
        ]
}
