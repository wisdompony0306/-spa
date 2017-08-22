var webpack = require('webpack');
var Merge = require('webpack-merge');
var BaseConfig = require('./webpack.base.config');

module.exports = function (env) {
    return Merge(BaseConfig, {
        //devtool: 'source-map',
        output: {
            publicPath: '/build',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('dev')
                }
            })
        ]
    })
}();