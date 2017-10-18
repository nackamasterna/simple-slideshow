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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
        })
    ],
    resolve: {
        extensions: ['webpack.js', 'web.js', '.ts', '.tsx', '.js']
    },
    watch: true
}


// module.exports = {
//     entry: './src/app.ts',
//     output: {
//       filename: 'dist/bundle.js'
//     },
//     resolve: {
//       extensions: ['.ts', '.js', '.tsx', '.jsx', '']
//     },
//     module: {
//       loaders: [
//         {
//           test: /\.tsx?$/,
//           exclude: /node_modules/,
//           loader: 'ts-loader'
//         }
//       ]
//     }
//   }