var webpack = require('webpack');
var path    = require('path');

module.exports = {
	context : path.resolve(__dirname, './src'),
	entry : {
		app: './app.js',
		app: ['./home.js', './events.js', './vendor.js'],	
		home: './home.js',
		events: './events.js',
		contact: './contact.js'
	},
	output : {
		path: path.resolve(__dirname, './dist'),
		filename: [name].bundle.js
	}
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
			minChunks: 2,
		}),
	],
}