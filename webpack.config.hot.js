
'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

module.exports = {
    devtool: 'eval-source-map',

    entry: [
        __dirname + '/src/entry.js', //唯一入口文件
        "webpack-dev-server/client?http://localhost:8888",
        "webpack/hot/dev-server"
    ],
    
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js',      //打包后输出文件的文件名
        publicPath: '/build/'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "react-hot!jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.HotModuleReplacementPlugin()
    ]

}
