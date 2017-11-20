var Index = function () {


    return {
        //main function to initiate the module
        init: function () {
            Index.menuOperation();
        },
        menuOperation:function(){
        	$(".sub-menu a").click(function(){
				var url = $(this).attr("href");
				Index.changeContent(url);
				return false;
			});
        },
        changeContent:function(url){
        	$.ajax({
				url:url,
				type:"post",
				success:function(data){
					$(".page-content").html(data);
				}
			});
        },
        loginOut:function(){//退出
			location.href="/exit";
        }
    };

}();