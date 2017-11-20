var db = require("./connection");
var resourceService={};

resourceService.getAllResource = function(){
	var sql = "select * from resource ";
	return db.query(sql,[]);
}





module.exports= resourceService;