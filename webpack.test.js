var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        test : './demo/test.js'
    },
    output: {
        path: path.join(process.cwd(), './demo/'),
        filename : '[name].bundle.js',
    },
    devtool: '#source-map',
    resolve: {
        root: [path.resolve('./src'), path.resolve('./lib')],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!autoprefixer-loader!less-loader')
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
