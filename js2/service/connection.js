var mysql      = require('mysql');
const config = {
	host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'node_web',
  connectionLimit : 10
}
var pool = mysql.createPool(config);
 
var db={};

db.query = function(sql,params){
	var p = new Promise(function(resolve, reject){
		 if (!sql) {  
	        reject("查询SQL为空");  
	    }else{
	    	var query = pool.query(sql,params,function(err, rows, fields) {  
		      if (err) {  
		        reject(err);  
		      };  
		    //  console.log("查询结果：");
		      //console.log(rows);
		      resolve(rows);  
		    });
	    }
    });
    return p;   
};


db.execute = function(sql,params){
	var p = new Promise(function(resolve, reject){
		 pool.getConnection(function(err,connection){
	 		if (err) {  
	        	reject(err);  
	      	} else{
	      		var query =  connection.query( sql , params , function (error, rows, fields){
	        		if (error) {  
				        reject(error);  
			      	}else{
			      		//console.log(rows);
			      		resolve(rows);  
			      	}
	      		});
	      		console.log("执行sql:"+query.sql);
	      	}
	    });
    });
    return p;   
}


 
module.exports= db;