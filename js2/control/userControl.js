var User = require("../../vo/User");
var userService = require("../service/userService");
var Page = require("../../vo/Page");
var userControl={};

userControl.list = function(req,res){
	var pageNo=1;
	var user = new User();
	pageNo = reqFormat(req.body.pageNo);
  	if(pageNo==""){
  		pageNo=1;
  	}
  	user.userName = reqFormat(req.body.userName);
	user.userType = reqFormat(req.body.userType);
	var page = new Page(pageNo,10);
	userService.queryUserForPage(page,user).then(function(data){
		var userArr = [];
		for(var i=0;i<data.length;i++){
			var u = new User(data[i]);
			userArr.push(u);
		}
		res.render("user/user-list.ejs",{userArr:userArr,page:page,user:user});
	}).catch(function(reason){
		console.log(reason);
	});
}

function reqFormat(str){
	if(str==undefined){
		return "";
	}
	return str;
}
module.exports= userControl;