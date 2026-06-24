const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'functional/trade-api': './src/functional/trade-api.test.ts',
    'performance/load-test': './src/performance/load-test.test.ts',
    'performance/stress-test': './src/performance/stress-test.test.ts',
    'performance/spike-test': './src/performance/spike-test.test.ts',
    'performance/concurrency-test': './src/performance/concurrency-test.test.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
};
