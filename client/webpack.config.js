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
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
