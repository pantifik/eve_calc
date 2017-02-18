
module.exports = {
    entry: "./test",
    output: {
        filename: "build.js"
    },

    watch: true,

    module: {
      loaders: [{
          test: /\.js$/,
          loader: "babel",
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    devtool: 'source-map'
}