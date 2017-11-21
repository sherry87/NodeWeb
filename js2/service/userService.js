var db = require("./connection");
var crypto = require('crypto');
var resourceService = require("./ResourceService");
var permissionService = require("./PermissionService");

var userService={};

userService.getUserId = function(){
	var sql = "select value from global_sequences where NAME='User' for update ";
	var updateSql = "update global_sequences set value= value+1 where NAME='User' ";
	return Promise.all([db.query(sql,[]),db.execute(updateSql,{})]);
}

//新增用户
userService.addUser = function(user){
	return userService.getUserId().then(function(values){
		var userId = values[0][0].value;
		var insterSQL =" INSERT INTO USER_INFO SET ? ";
		var pwd = md5(user.password);
		var insterParams={USER_ID:userId,user_name:user.name,password:pwd,create_tm:new Date(),USER_email:user.email,USER_TYPE:2,USER_STATUS:1};
		return db.execute(insterSQL,insterParams);
	});
}
//根据用户名和密码查询用户
userService.queryUserByName = function(userName){
	return db.query("select * from USER_INFO where user_name=? ",[userName]);
}

//根据用户名和密码查询用户
userService.queryUserByNameAndPwd = function(userName,password){
	return db.query("select * from USER_INFO where user_name=? and password=? ",[userName,md5(password)]);
}

userService.queryAllUser = function(){
	return db.query("select * from USER_INFO ",[]);
}

//分页查询
userService.queryUserForPage = function(page,searchObj){
	var sql = "select * from USER_INFO u where 1=1 ";
	var params = [];
	if(searchObj.userType != null && searchObj.userType != ""){
		sql +=" and u.USER_TYPE = ? ";
		params.push(searchObj.userType);
	}
	if(searchObj.userName != null && searchObj.userName != ""){
		sql +="  and u.USER_NAME like ? ";
		params.push(searchObj.userName);
	}
	return  db.pageQuery(page,sql,params);
}

function md5(str) {
　　var ret = crypto.createHash('md5').update(str.toString()).digest("hex");
　　return ret;
}

module.exports= userService;