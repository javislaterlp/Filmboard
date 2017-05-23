var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      './src/app.js',
      './css/style.scss'
    ]
  },
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: 'css-loader?importLoaders=1'
      })
    }, {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader?name=/public/img/[name].[ext]'
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/bundle.css',
      disable: false,
      allChunks: true
    })
  ]
};
