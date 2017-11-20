var express = require("express");
var session = require('express-session');
var app = express();
var ejs = require("ejs");
var path = require("path");
var reg = require("./js/reg");
var login = require("./js/login");

//post参数获取需引用
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/*+json'}));

app.use("/media",express.static("media"));
app.use(session({
		genid: function(req) {
	    	return genuuid() // use UUIDs for session IDs
	  	},
  		secret: 'keyboard cat'
	}));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "html"); 

//首页
app.get("/",function(req,res){
	/*if(req.session!=undefined&&req.session.user!=undefined){
		res.render("main.ejs",{user:req.session.user});
	}else{*/
		res.sendFile(__dirname +"/"+"login.html");
	//}
});

//注册
app.post("/reg",function(req,res){
  	var opt={};
  	opt.name = req.body.username;
  	opt.password = req.body.password;
  	opt.email = req.body.email;
  	
  	reg.saveReg(opt,saveBack);
  	
  	function saveBack(obj){
  		res.json(obj);
  	}
});

//登录
app.post("/login",function(req,res){
  	var opt={};
  	opt.name = req.body.username;
  	opt.password = req.body.password;
  	opt.remember = req.body.remember;
  	opt.req = req;
  	
  	login.login(opt,loginBack);
  	function loginBack(obj){
  		res.json(obj);
  	}
});

//控制台
app.get("/console",function(req,res){
	if(req.session!=undefined&&req.session.user!=undefined){
		res.render("index.ejs",{user:req.session.user});
	}else{
		res.sendFile(__dirname +"/"+"login.html");
	}
})

var server= app.listen(8888,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s",host,port);
});

function genuuid(){
	var mydate = new Date();
	var uuid = "cms"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds()+ Math.round(Math.random() * 10000);
	return uuid;
}

//数据库操作测试
function mysqlOperation(){
	//查询
	var sql ="select * from user where user_name= ?";
	var params =[""];
	db.query(sql,params,test);
	
	//插入
	/*var sql2=" INSERT INTO user SET ? ";
	var params2={user_name:'test',password:'222',create_tm:null,email:''};
	db.execute(sql2,params2,test);
	*/
	function test(){
		console.log(arguments);
	}
}
