const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
    const config = {
        entry: [
            "@babel/polyfill",
            'react-hot-loader/patch',
            './frontend/index.js'],
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, '../static'),
            publicPath: '/static/'
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                'react-hot-loader/babel',
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
        },
        optimization: {
            minimizer: [
              new TerserJSPlugin({}),
              new OptimizeCSSAssetsPlugin({})
            ]
        }
    }

    config.plugins = [
        new MiniCssExtractPlugin({
            filename: "app.css",
            chunkFilename: "[id].[chunkhash].css"
        }),
    ]

    if (options.mode == 'development') {
        config.output.publicPath = 'http://localhost:8001/static/';
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devtool = 'inline-source-map';
        config.devServer = {
            hot: true,
            inline: true,
            port: 8001,
            contentBase: path.join(__dirname, '../static'),
            stats: {color: true,},
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                "Access-Control-Allow-Origin": "*"
            }
        }

    } else {
        config.plugins.push(new CleanWebpackPlugin());
    }

    config.plugins.push(new ManifestPlugin({
        writeToFileEmit: true,
        generate: (seed, files) => files.reduce((manifest, {name, path}) => {
            const isExist = manifest.assets;
            if (isExist) {
                manifest.assets[name] = path;
            } else {
                manifest.assets = {[name]: path}
            }
            return ({...manifest})
        }, seed),
        seed: {
            "publicPath": ''
        }
    }))

    return config;
};
