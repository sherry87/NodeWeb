var User = require("../../vo/User");
var userService = require("../service/userService");

var userControl={};

userControl.list = function(req,res){
	 console.log("user/list");
	userService.queryAllUser().then(function(data){
		var userArr = [];
		for(var i=0;i<data.length;i++){
			var user = new User(data[i]);
			userArr.push(user);
		}
		res.render("user/user-list.ejs",{userArr:userArr});
	}).catch(function(reason){
		console.log(reason);
	});
}
module.exports= userControl;