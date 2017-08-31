var Webpack = require('webpack');
var WebpackDevServer = require("./node_modules/webpack-dev-server/lib/Server");
var webpackConfig = require("./webpack.config.hot");
var reduxWebpackConfig = require('./webpack.config.redux');
console.log(process.argv);
var wConfig = process.argv[2] === 'redux' ? reduxWebpackConfig : webpackConfig;

var compiler = Webpack(wConfig);
var server = new WebpackDevServer(compiler, {
	hot: true,
	filename: webpackConfig.output.filename,
	publicPath: webpackConfig.output.publicPath,
	historyApiFallback: true,
	stats: {
		colors: true
	}
});

server.listen(8888, 'localhost', function() {
	console.log("starting server on http://localhost:8888");
});