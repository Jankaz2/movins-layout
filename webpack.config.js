const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FileLoader = require('file-loader')

module.exports = {
    entry: {
        index: './src/index.js',
    },

    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'src'),
        },
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /react-icons\/(.)*(.js)$/,
                use: ['babel-loader']
            }
        ]
    },

    output: {
        path: path.join(__dirname, '/dist'),
        filename: "./js/[name].bundle.js",
        publicPath: "/"
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
            chunks: ['index']
        }),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/app/assets',
                    to: './assets'
                }
            ]
        })
    ],

    devtool: 'source-map',
    mode: "development"
}