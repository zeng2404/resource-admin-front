const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ["babel-polyfill", "./src/index.tsx"]
        // app: ['./src/index.tsx'],
        // vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
                // use: ['style-loader', 'css-loader']
            },
            {
                test: /(\.jsx|\.js)$/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            "react","es2015"
                        ]
                    }}],
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ]
};