module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
          exclude: /node_modules/,
          loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
