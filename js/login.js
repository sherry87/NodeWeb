var db = require("./connection");

var login = function(options,callback){
	var name = options.name;
	var password = options.password;
	var remember = options.remember;
	var req = options.req;
	
	db.query("select * from user where user_name=? and password=? ",[name,password],queryBack);
	console.log("login")
	var obj={};
	obj.message="";
	obj.status=0;
	function queryBack(){
		console.log(arguments);
		if(arguments.length==3){
			var rows = arguments[1];
			if(rows.length==0){
				obj.message="用户或密码错误";
				obj.status=-1;
				callback(obj);
			}else{
				var user = rows[0];
				req.session.user = user;
				console.log("用户%s登录",user.USER_NAME);
				callback(obj);
			}
		}else{
			obj.message="查询错误";
			obj.status=-1;
			callback(obj);
		}
	}
			
}

module.exports.login= login;