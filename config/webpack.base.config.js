var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var node_dir=path.resolve(__dirname, '../node_modules');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlwebpackPlugin({
        title: '毕业季',
        filename: 'index.html',
        hash: false,
        inject: true,
        template: path.resolve(__dirname,'../src/index.html'),
        chunks: ['vendor', 'graduation']
    }),
    new webpack.ProvidePlugin({
        Vue: "Vue"
    })
];

module.exports = {
    entry: {
        'vendor': ['babel-polyfill','vue', path.resolve(__dirname,'../src/plugins/vue.ext.js')],
        'graduation': path.resolve(__dirname,'../src/index')
    },
    output: {
        path: path.resolve(__dirname,'../build'),
        publicPath: '/build',
        filename: '[name].js',
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        root: [
            path.resolve('../src')
        ],
        alias: {
            "vue": node_dir + '/vue/dist/vue.runtime.js',
        },
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less")},
            {test: /\.json$/, loader: 'json'},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=5120&name=/img/[name].[ext]'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'transform-object-rest-spread']
    },
    lessLoader: {
        lessPlugins: [
            {
                install: function (less) {
                    less.functions.functionRegistry.add('px2rem', function (px, size) {
                        var size = (size && size.value || 750) / 10;
                        return new (less.tree.Anonymous)(px.value / size + 'rem');
                    });
                }
            }
        ]
    },
    plugins: plugins
};
