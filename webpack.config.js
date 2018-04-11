'use strict';

const webpack = require("webpack");
var path = require('path');
module.exports = {
    resolve:{
        extensions: ['', '.js', '.vue'],
        alias:{
            components:path.join(__dirname,"./components")
        }
    },
    module: {
        loaders: [
            {test: /\.vue$/,loader: 'vue',exclude: /node_modules/},
            {test:/\.js?$/,loaders:['babel','eslint'],exclude: /node_modules/},
        ]
    }
};