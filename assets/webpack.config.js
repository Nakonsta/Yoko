const path = require('path');
const fs = require('fs');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
require("@babel/core").transformSync("code", {
    plugins: ["@babel/plugin-proposal-object-rest-spread"]
  });

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const filename = (ext) => isDevelopment ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const filenameNoHash = (ext) => `[name].${ext}`;

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};
const pagesDir = `${PATHS.src}/`;
const pages = fs.readdirSync(pagesDir).filter((fileName) => fileName.endsWith('.html'));

const optimize = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if (isProduction) {
        configObj.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin
        ]
    }

    return configObj;
};

const usePlugins = () => {
    const basePlugins = [
        // new HTMLWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/index.html'),
        //     filename: 'index.html',
        //     minify: {
        //         collapseWhitespace: isProduction
        //     }
        // }),
        ...pages.map(
            (page) => new HTMLWebpackPlugin({
              template: `${pagesDir}/${page}`,
              filename: `./${page.replace(/\.html/, '.html')}`,
              minify: false,
            }),
          ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/custom'),
                to: path.resolve(__dirname, 'app')
            }]
        }),
    ];

    if (isProduction) {
        basePlugins.push(
            new ImageminPlugin({
                bail: false, // Ignore errors on corrupted images
                cache: true,
                imageminOptions: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [{
                                    removeViewBox: false
                                }]
                            }
                        ]
                    ]
                }
            })
        )
    }

    return basePlugins
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    // entry: './js/index.js',
    entry: ["@babel/polyfill", "./js/index.js"],
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3001,
    },
    // optimization: optimize(),
    plugins: usePlugins(),
    devtool: isProduction ? false : 'source-map',
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDevelopment
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.s[a,c]ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //       presets: ['@babel/preset-env'],
                //     },
                // },
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${filenameNoHash('[ext]')}`,
                    }
                }],
            },
            {
                test: /\.(?:|woff|woff2|eot|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/${filenameNoHash('[ext]')}`,
                    }
                }],
            }
        ]
    }
}