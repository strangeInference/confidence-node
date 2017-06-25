module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
