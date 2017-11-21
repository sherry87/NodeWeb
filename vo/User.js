
function User(obj){
	if(obj!=undefined){
		this.userId = obj.USER_ID;
		this.userName = obj.USER_NAME;
		this.userType = obj.USER_TYPE;// 1:超管 2：维护商 3：技术员
		this.status = obj.USER_STATUS;// 1:启用 2：停用
		this.email = obj.USER_EMAIL;
		this.CREATE_TM = obj.CREATE_TM;
	}
	
}

module.exports= User;
