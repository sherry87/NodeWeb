var db = require("./connection");
var Permission = require("../../vo/Permission");
var permissionService={};

permissionService.getAllPermission = function(){
	var sql = "select * from permission ";
	return db.query(sql,[]);
}

permissionService.setPermissionArr = function(data,req){
	var map = new Map();
	var subMap = new Map();
	for(var i=0;i<data.length;i++){
		var permission = new Permission(data[i]);
		if(permission.parentId=="00"){
			map.set(permission.permissionId,permission);
		}else if(permission.parentId!=""&&permission.parentId!=null){
			var arr = subMap.get(permission.parentId);
			if(arr==undefined){
				arr = [];
			}
			arr.push(permission);
			subMap.set(permission.parentId,arr);
		}
	}
	
	var permissionArr=[];
	map.forEach(function (value, key, map) {
	    var sub = subMap.get(key);
	    if(sub!=undefined){
	    	value.children = sub;
	    }else{
	    	value.children = [];
	    }
	    permissionArr.push(value);
	});
	
	req.session.permissionArr = permissionArr;
}






module.exports= permissionService;