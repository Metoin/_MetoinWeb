var webpack           = require('webpack'),
	path              = require('path'),
	HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH   = path.resolve(__dirname),
	MODULE_PATH = path.resolve(ROOT_PATH,"./node_modules"),
	SRC_PATH    = path.resolve(ROOT_PATH, 'source'),
	BUILD_PATH  = path.resolve(ROOT_PATH, 'assets');

module.exports = {
	devtool: '#source-map',
	context: path.resolve(ROOT_PATH, './source'),
	entry: {
		weibo: './source/weibo.js',
		// member: ['./home.js', './events.js', './vendor.js'],	
		member: './source/member.js',
	},

	output: {
		path: path.resolve(__dirname, './assets'),
		filename: [name].bundle.js
	},

	module: {
		oParse: /es6-promise\.js$/,
		rules:[
		    // 处理JS文件
		    {
		    	test:/\.vue?$/,                  //test值为正则表达式，当文件路径匹配时启用
		    	/*include: [
		    	    __dirname+ "/src/js",
		    	],*/
		    	loader:'vue-loader',                 //指定使用什么loader，可以用字符串，也可以用数组
		    	//exclude: /regexp/,            //可以使用exclude来排除一部分文件

		    	//可以使用query来指定参数，也可以在loader中用和require一样的用法指定参数，如`jade?p1=1`
			    query: {
			        presets: ['es2015']
			    },
			    options: vueConfig
		    },
		    { test: /\.vue$/, loader: 'vue'}
		],
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
			minChunks: 2,
		}),        
        // JS代码压缩混淆
		/*new webpack.optimize.UglifyJsPlugin({    //压缩代码
		   compress: {
		       warnings: false
		   },
		   except: ['$super', '$', 'exports', 'require']    //排除关键字
		}),*/
		//new CommonsChunkPlugin("common.js", [""]),  
	],

	externals: {
	   "jquery": "jQuery"
	}
}