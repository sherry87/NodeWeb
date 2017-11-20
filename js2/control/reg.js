var userService = require("../service/userService");

var saveReg = function(options){
	var name = options.name;
	var password = options.password;
	var email = options.email;
	var res = options.res;
	
	var obj={};
	obj.message="";
	obj.status=0;
	
	userService.queryUserByName(name).then(function(data){
		if(data.length>0){
			obj.message="用户名已存在";
			return Promise.reject("用户名已存在");
		}
		return userService.addUser(options);
	}).then(function(data){
		res.json(obj);
	}).catch(function(reason){
		console.log(reason);
		obj.message=reason;
		obj.status=-1;
		res.json(obj);
	});
	
	
}

module.exports.saveReg= saveReg;