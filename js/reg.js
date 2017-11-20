var db = require("./connection");

var saveReg = function(options,callback){
	var name = options.name;
	var password = options.password;
	var email = options.email;
	
	var sql ="select * from user where user_name= ?";
	var params =[name];
	db.query(sql,params,queryBack);
	
	var obj={};
	obj.message="";
	obj.status=0;
	
	function queryBack(){
		if(arguments.length==3){
			var result = arguments[1];
			if(result.length>0){//已存在的用户
				obj.message="用户名已存在";
				obj.status=-1;
				callback(obj);
			}else{//保存用户
				var sql2=" INSERT INTO user SET ? ";
				var params2={user_name:name,password:password,create_tm:new Date(),email:email};
				db.execute(sql2,params2,executeBack);
			}
		}else{
			obj.message="查询错误";
			obj.status=-1;
			callback(obj);
		}
	}
	
	function executeBack(){
		if(arguments.length==3){
			obj.message="";
			obj.status=0;
			callback(obj);
		}else{
			obj.message="查询错误";
			obj.status=-1;
			callback(obj);
		}
	}
}

module.exports.saveReg= saveReg;