
module.exports = {
  mode: 'production',
  entry: './client/src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/react'],
        },

      },
    ],
  },
  target: 'web',
  output: {
    path: `${__dirname}/client/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/client/public`,
  },
};
