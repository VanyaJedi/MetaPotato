const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'development',
    entry: {
        main: './wwwroot/js/main.js',
        auth: './wwwroot/js/auth.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'wwwroot/build'),
    },
    devtool: 'source-map',
    watch: true,
    performance: { hints: false }
};
