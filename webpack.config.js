'use strict';
var webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var fs = require('fs')	;

var debug = process.env.NODE_ENV !== 'prod'? true : false;
console.log(debug);

var config = {
	entry: {},
	output: {
		path: 'dest',
		filename: debug ? 'page/[name]/js/[name].js' : 'static/page/[name]/js/[name].[chunkhash:8].js',
		publicPath: debug ? '/' : 'http://m.vip.com/'
	},
	devServer: {
		contenBase: 'src/',
		port: '3000',
		stats: {
			cache: false,
			//exclude: excludeFromStats,
			colors: true
		}
	},
	resolve: {
		extensions: ['', '.coffee', '.js', '.jsx', '.png', '.jpg', '.gif', '.css', '.scss', 'tpl'],
		alias: {
			base: __dirname + '/src/base',
			component: __dirname + '/src/component',
			lib: __dirname + '/src/lib',
			page: __dirname + '/src/page',
		}
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
			{test: /\.(png|jpg|gif)$/, loader: 'url-looder?limit=1024&name=' + (debug?'base/img/[hash:8].[name].[ext]':'static/base/img/[hase:8].[name].[ext]')},
			{test: /\.(eot|svg|ttf|woff)$/, loader: 'url-loader?limit=1024&name=' + (debug?'base/css/font/[hase:8].[name].[ext]':'static/base/css/font/[hase:8].[name].[ext]')},
			{test: /\.js$/, loader: 'babel-loader'},
			{test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader!jsx-loader?harmony'}
		]
	},
	plugins: [
		new ExtractTextPlugin(debug?'page/[name]/css/[name].css':'static/page/[name]/css/[name].[chunkhash:8].css')
	]
};

//get page list
function getPages() {
	var pages = fs.readdirSync(__dirname + '/src/page'),
		ret = [];
	pages.forEach(function(file){
		ret.push(file);
	});
	return ret;
}
//get business component
function getBusiness() {
	var mods = fs.readdirSync(__dirname + '/src/component/business/'),
		ret = [];
	mods.forEach(function(file){
		ret.push(file);
	});
	return ret;
}
//get common component
function getGlobal(){
	var mods = fs.readdirSync(__dirname + '/src/component/global/'),
		ret = [];
	mods.forEach(function(file){
		ret.push(file);
	});
	return ret;
}
//set config
function setConfig(){
	var pages = getPages(),
		mods = getBusiness(),
		global = getGlobal();
	pages.forEach(function(filename){
		if(fs.existsSync(__dirname + '/src/page/' + filename + '/js/' + filename + '.js')){
			config.entry[filename] = './src/page/' + filename + '/js/' + filename  + '.js';
		}
	});
	var chunks = Object.keys(config.entry);
	config.plugins.push(new CommonsChunkPlugin({
		name: 'vendors',
		chunks: chunks,
		minChunks: chunks.length //
	}));
	return config;
}

setConfig();
module.exports = config;