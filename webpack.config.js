const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: "./src/js/main.js",
    },
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "[name].js" //打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({    // use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                    fallback: "style-loader",       // fallback:编译后用什么loader来提取css文件
                    use: ["css-loader"]
                })
            }           // webpack2的写法，
                        // webpack1的写法ExtractTextPlugin.extract("style-loader","css-loader"); webpack2不支持
        ]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'src/js/lib/jquery-3.1.0.js')  //给jquery别名，与下面的jq插件配合
        }
    },

    plugins: [
        new webpack.ProvidePlugin({     //则 无需每个文件引入jQ
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.optimize.UglifyJsPlugin(), //压缩JS
        new ExtractTextPlugin("./[name].css") //分离CSS和JS文件
    ]
}