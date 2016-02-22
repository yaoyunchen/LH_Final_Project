module.exports = {
  entry: './js/main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
   // Lets the app reload on the fly.
   inline: true,
   // Sets the host.
   host: '0.0.0.0',
   // Specifies the port.
   port: 8000,
   watchOptions: {
     aggregateTimeout: 300,
     poll: 1000
   }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}