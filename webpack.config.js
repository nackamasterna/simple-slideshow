var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: ['./ts-src/simple-slideshow.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'simple-slideshow.js',
        libraryTarget: 'umd',
        library: 'SimpleSlideShow',
        umdNamedDefine: true
    },
    module:{
        loaders:[{
            test:/\.ts$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname ,"ts-src"),
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['webpack.js', 'web.js', '.ts', '.tsx', '.js']
    },
    watch: true
}
