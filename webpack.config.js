const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', /* <--- Точка входа */
  output: {
    filename: 'bundle.js', /* <--- Имя итогового бандла */
    path: path.resolve(__dirname, 'build'), /* <--- Имя точки выхода и абсолютный путь до неё */
    clean: true /* <--- Очистка директории для сборки перед новой сборкой */
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({ /* <--- Плагин: копирует файлы из /public в /build и туда же подкладывает бандл */
      patterns: [{ from: 'public' }]
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader'] /* <--- Подключение babel-loader */
        }
    ]
  }
};
