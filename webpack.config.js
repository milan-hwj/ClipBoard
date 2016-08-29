var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        superClipBoard : './src/main.js'
    },
    output: {
        path: path.join(process.cwd(), './dist/'),
        filename : '[name].min.js',
    },
    devtool: '#source-map',
    resolve: {
        root: [path.resolve('./src'), path.resolve('./lib')],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: false,
        //     compress: {
        //         warnings: false
        //     }
        // })
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
