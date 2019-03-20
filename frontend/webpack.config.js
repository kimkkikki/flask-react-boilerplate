const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
    const config = {
        entry: [
            "@babel/polyfill",
            './frontend/index.js'],
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, '../static'),
            publicPath: '/static/'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {"legacy": true}],
                                ["@babel/plugin-proposal-class-properties", {"loose": true}]
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|ico|svg|eot|woff|woff2|otf|ttf)$/,
                    use: ['file-loader']
                }
            ]
        }
    }

    if (options.mode == 'development') {
        config.plugins = [
          new webpack.HotModuleReplacementPlugin()
        ];
    
        config.devtool = 'inline-source-map';
        config.devServer = {
          hot: true,
          contentBase: path.resolve(__dirname, '../static'),
          stats: {
            color: true
          },
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Access-Control-Allow-Origin": "*"
          }
        };
    } else {
        config.plugins = [
            new CleanWebpackPlugin()
        ]
    }

    return config;
};
