 i18n = require("i18n");
function Permission(obj){
	this.permissionId = obj.PERMISSION_ID;
	this.permissionName = obj.PERMISSION_NAME;
	this.parentId = obj.PARENT_ID;
	this.order = obj.p_order;
	this.link_permission = obj.link_permission;
	this.largeIcon = obj.LARGE_ICON;
	this.smallIcon = obj.SMALL_ICON;
	this.herfValue = obj.HERF_VALUE;
}

module.exports= Permission;