
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
      filename: 'app.js',
      publicPath: 'dist'
  },
  module: {
      rules: [
          {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          }
      ]
  }
};