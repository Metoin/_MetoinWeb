"use strict"
/*
 * 首页控制器
 */
class Index{
	constructor (){
		console.log(1111111);
	}

	index (req, res){
		res.render('index/index', { title: 'Express', params: req });
	}
}
module.exports = new Index();