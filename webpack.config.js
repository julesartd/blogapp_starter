const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    // Point d'entree
    entry: {
        main: path.join(__dirname, 'src', 'index.js'),
        form: path.join(__dirname, 'src', 'form', 'form.js'),
        common: path.join(__dirname, 'src', 'assets', 'js', 'topbar.js')
    },
    // Point de sortie
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                // recuperer tous les fichier js
                test: /\.js/,
                exclude: /(node_modules)/, // On exclut les js de node_modules
                use: ['babel-loader'] // on utilise babel pour charger et modifier le JS
            },
            {
                test: /\.scss/,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/assets/images', to: 'assets/images'}
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src', 'index.html'),
            chunks: ['main', 'common']
        }),
        new HtmlWebpackPlugin({
            filename: 'form.html',
            template: path.join(__dirname, 'src', 'form', 'form.html'),
            chunks: ['form', 'common']
        }),
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    devServer: {
        static: path.join(__dirname, 'dist'),
        open: true,
        port: 4000
    }
}