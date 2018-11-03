module.exports = {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ["react", "env"],
            plugins: ['transform-runtime']
        }
    }]
}