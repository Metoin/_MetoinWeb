var path = require('path');
var url = require("url");
var express = require('express');
var router = express.Router();

router.get('*', function(req, res) {
	var pathname = url.parse(req.url).pathname.toLowerCase();
	var paths = pathname.split('/');
	var controller = paths[1] || 'index';
	if(controller == "favicon.ico") return 
	var action = paths[2] || 'index';
	var args = paths.slice('3');
	var module;
	try{
		module = require('../controllers/'+controller);
	}catch(e){
		// 用于处理错误代码
		console.log(e);
		return;
	}
	var method = module[action];
	if(method){
		method.apply(null, [req,res].concat(args));
	}else{
		console.log(2222333);
		// 报错处理
	}
});

module.exports = router;