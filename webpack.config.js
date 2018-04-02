const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/render.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            //babelrc: true,
                            presets: [
                                [
                                    'env',
                                    {
                                        "targets": {
                                            "node": "current"
                                        }
                                    }
                                ],
                                'react'
                            ],
                            plugins: ['react-hot-loader/babel'],
                        },
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|svg|ttf|woff|eot|json)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    target: 'electron-renderer',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        //new webpack.NamedModulesPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: './app_package.json', to: './package.json' }
        ], {})
    ],

    devServer: {
        contentBase: './dist',
        hot: true
    },

    devtool: 'source-map'
}