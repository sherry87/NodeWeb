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
		      resolve(rows);  
		    });
		     console.log("执行sql:"+query.sql+"，params:"+params);
	    }
    });
    return p;   
};

//一条数据查询
db.queryOne = function(sql,params){
	var p = new Promise(function(resolve, reject){
		 if (!sql) {  
	        reject("查询SQL为空");  
	    }else{
	    	var query = pool.query(sql,params,function(err, rows, fields) {  
		      if (err) {  
		        reject(err);  
		      };  
		      resolve(rows[0]);  
		    });
		    console.log("执行sql:"+query.sql);
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
			      		resolve(rows);  
			      	}
	      		});
	      		console.log("执行sql:"+query.sql);
	      	}
	    });
    });
    return p;   
}

db.pageQuery = function(page,sql,params){
	return db.queryPageTotalCount(sql,params).then(function(data){
		page.totalCount = data.ct;
		page.totalPage = Math.ceil(page.totalCount/page.pageSize)
		pageLimit(page,params);
		return db.query(sql+" limit ?,? ",params);
	});
}

//查询分页总数
db.queryPageTotalCount = function(sql,params){
	var totalSql = "select count(1) as ct from ("+sql+") as a";
	return db.queryOne(totalSql,params);
}
var pageLimit = function(page,params){
	var max = parseInt(page.pageNo)*parseInt(page.pageSize);
	var min = parseInt(page.pageNo-1)*parseInt(page.pageSize);
	if(min<0) min=0;
	if(max>page.totalCount) max = parseInt(page.totalCount);
	if(max<0) max=0;
	
	params.push(min);
	params.push(max);
}

 
module.exports= db;