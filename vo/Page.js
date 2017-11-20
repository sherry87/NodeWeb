function Page(pageNo,pageSize){
	
	this.totalCount = 0;//总数
	this.pageSize =10;//每页显示数量
	this.pageNo =1;//第几页
	this.totalPage = 0;//总页数
	
}

function isPositiveInteger(s){//是否为正整数
     var re = /^[0-9]+$/ ;
     return re.test(s)
 } 
module.exports= Page;