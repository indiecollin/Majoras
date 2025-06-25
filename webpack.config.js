const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = () => {
    return {
        mode: 'development',
        target: 'node',
        devtool:'inline-source-map',
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
            new MiniCssExtractPlugin({filename: 'styles.css'}),
        ]
    }
};