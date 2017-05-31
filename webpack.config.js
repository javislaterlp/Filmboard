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
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }]
  }
};
