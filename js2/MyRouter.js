const url = require("url");
var user = require("./control/userControl");

var controls ={};
controls.user = user;


var MyRouter = {};

MyRouter.init = function(req,res,next){
	var xx = url.parse(req.url).pathname;
	if(xx!=""){
		var arr = xx.split("\/");
		if(arr.length>2){
			var ct = controls[arr[1]];
			if(ct != undefined && ct.hasOwnProperty(arr[2])){
				 ct[arr[2]](req,res);
				 return;
			}
		}
	}
	next();
	
}

module.exports= MyRouter;