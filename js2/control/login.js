var userService = require("../service/userService");
var User = require("../../vo/User");
var resourceService = require("../service/ResourceService");
var permissionService = require("../service/PermissionService");

var login = function(options){
	var name = options.name;
	var password = options.password;
	var remember = options.remember;
	var req = options.req;
	var res = options.res;
	
	var obj={};
	obj.message="";
	obj.status=0;
	
	userService.queryUserByNameAndPwd(name,password).then(function(data){
		if(data.length==0){
			return Promise.reject("用户或密码错误");  
		}
		var user = new User(data[0]);
		if(user.status==3){
			return Promise.reject("用户已禁用");  
		}
		req.session.user = user;
		return resourceService.getAllResource();
	}).then(function(data){
		//资源处理
		//...
		
		return permissionService.getAllPermission();
	}).then(function(data){
		permissionService.setPermissionArr(data,req);
		res.json(obj);
	}).catch(function(reason){
		console.log("catch异常：");
		console.log(reason);
		obj.message=reason;
		obj.status=-1;
		res.json(obj);
	});
}



module.exports.login= login;