const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './bootstrap.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bootstrap.js'
  },
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ]
}
