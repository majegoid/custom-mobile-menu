const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = 'development'; //default to development
let target = 'web'; //default to no backwards compatibility

//change to production if process NODE_ENV variable is 'production'
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

module.exports = {
  mode: mode, //optimize for development or production
  target: target, //build for the web with or without backwards compatibility (browserslist)
  entry: {
    index: './src/index.js',
    createMobileMenu: './src/createMobileMenu.js',
  },
  output: {
    filename: '[name].js',
    library: {
      // name: 'MyLibrary',
      type: 'module',
      // umdNamedDefine: true,
    },
    // globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    //how to treat the files in this app (are they importable code, css, images, or other files?)
    rules: [
      // css imported into JS files will be turned into a main.css bundle
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '' } }, //built css files go in the dist folder
          'css-loader',
        ],
      },
      // js files will be transpiled by babel-loader into a main.js bundle
      {
        test: /\.(js)$/,
        exclude: /node_modules/, // do not attempt to build anything inside of node_modules
        use: {
          loader: 'babel-loader', //use babel to load JS files
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()], //minimize CSS files
  },
  plugins: [
    new CleanWebpackPlugin(), // removes dist folder on build
    new MiniCssExtractPlugin(), // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'module',
    }), //makes an index.html file with every built JS and CSS file attached, uses a template file's skeleton
  ],
  // determines the order that files are "resolved" in
  resolve: {
    extensions: ['.js'], //if two files have the same name, the .js file is chosen.
  },
  devtool: 'source-map', //source maps are generated as separate files with "original (high) quality"
  devServer: {
    //configure webpack devserver
    static: './dist', //serve static files from the dist folder
    hot: true, //enable HMR, allowing for module replacement without full reloads
  },
  experiments: {
    outputModule: true,
  },
};
