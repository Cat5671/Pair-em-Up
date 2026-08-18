import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js', // JS будет сохраняться в папку dist/js
    clean: true,
  },

  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'sass-loader'
        ],
      },

      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext]'  
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    
 
    new MiniCssExtractPlugin({
  
      filename: 'css/[name].css', 
    }),
  ],
};