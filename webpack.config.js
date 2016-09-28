
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  module: {
    loaders: [
      { loader: 'babel', test: /\.js$/, exclude: /node_modules/ }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  }
}
