const express = require("express");
var session = require('express-session');
var app = express();
var ejs = require("ejs");
var path = require("path");
var reg = require("./js2/control/reg");
var login = require("./js2/control/login");
var userControl = require("./js2/control/userControl");
var MyRouter = require("./js2/MyRouter");

//国际化
const i18n = require("i18n");
var setI18n = () => {
    const i18nOptions = {
        locales: ['cn'],
        directory: path.join(__dirname, './locales'),
        objectNotation: true,
        updateFiles: true,
    };

    i18n.configure(i18nOptions);
    return i18n.init;
};

const setLang = (req, res, next) => {
    res.setLocale('cn');
    next();
};

app.use(setI18n());
app.use(setLang);

//路由设置
app.use(function (req, res, next) {
   MyRouter.init(req, res, next);
});


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
	res.sendFile(__dirname +"/"+"login.html");
});

//登录
app.post("/login",function(req,res){
  	var opt={};
  	opt.name = req.body.username;
  	opt.password = req.body.password;
  	opt.remember = req.body.remember;
  	opt.req = req;
  	opt.res = res;
  	login.login(opt);
});

//控制台
app.get("/console",function(req,res){
	console.log(req.URL);
	if(req.session!=undefined&&req.session.user!=undefined){
		res.render("index.ejs",{user:req.session.user,permissionArr:req.session.permissionArr});
	}else{
		res.sendFile(__dirname +"/"+"login.html");
	}
})


//注册
app.post("/reg",function(req,res){
  	var opt={};
  	opt.name = req.body.username;
  	opt.password = req.body.password;
  	opt.email = req.body.email;
  	opt.res = res;
  	
  	reg.saveReg(opt);
});

//退出
app.get("/exit",function(req,res){
	console.log("exit");
	req.session.user = null;
	res.redirect
	res.redirect('/');
});




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