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

db.query = function(sql,params,callback){
	 if (!sql) {  
        callback();  
        return;  
    }  
    var query = pool.query(sql,params,function(err, rows, fields) {  
      if (err) {  
        console.log(err);  
        callback(err, null);  
        return;  
      };  
      callback(null, rows, fields);  
    });
};

db.execute = function(sql,params,callback){
	 pool.getConnection(function(err,connection){
	 		if (err) {  
        callback(err, null);  
        return;  
      };  
      
     var query =  connection.query( sql , params , function (error, rows, fields){
        	if (err) {  
		        callback(err, null);  
		        return;  
		      };  
		      callback(null, rows, fields);  
      });
      console.log("执行sql:"+query.sql);
	 });
}


 
module.exports= db;