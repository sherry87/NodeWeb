function Page(pageNo,pageSize){
	if(!isPositiveInteger(pageNo)||pageNo==0){
		pageNo=1;
	}
	if(!isPositiveInteger(pageSize)){
		pageSize=10;
	}
	
	this.totalCount = 0;//总数
	this.pageSize =10;//每页显示数量
	this.pageNo =pageNo;//第几页
	this.totalPage = 0;//总页数
	this.result=[];
	
}

function isPositiveInteger(s){//是否为正整数
     var re = /^[0-9]+$/ ;
     return re.test(s)
 } 
module.exports= Page;