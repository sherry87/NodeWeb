var db = require("./connection");
var roleService={};

roleService.getRoleById = function(roleId){
	var sql = "select * from role where roleId=? ";
	return db.query(db,[roleId]);
}

module.exports= roleService;