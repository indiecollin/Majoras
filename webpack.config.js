const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => {
    return {
        mode: 'production',
        target: 'node',        
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'build/public'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }, 
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { limit: 40000 }
                        },
                        'image-webpack-loader'
                    ]
                },
                {
                    test: /\.svg$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options:{encoding: true},
                        },
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.wav$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
                
            ]            
        },
        plugins: [        
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({filename: 'styles.css'}),
            new FaviconsWebpackPlugin({
                logo: './majoras-favicon.png',
                mode: 'webapp',
                favicons: {
                    appName: 'Majoras',
                    appDescription: "Recreation of the pause menu from The Legend of Zelda: Majora's Mask",
                    developerName: 'Collin Cain',
                    icons: {
                        android: true,
                        appleIcon: true,
                        appleStartup: false,
                        windows: false,
                        yandex: false,
                        coast: false,
                        firefox: false,
                        opengraph: false,
                        twitter: false,
                        safariPinnedTab: false,                                           
                    },
                },
            }),
            new FaviconsWebpackPlugin('./majoras-favicon.png')
        ]
    }
};
