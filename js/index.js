$(function(){
	//切换城市
	$(".city").click(function(){
		$(this).addClass("curr");
		$(this).siblings().removeClass("curr");
		var city = $(this).attr("city");
		$.ajax({
			url:springUrl + '/web/talk/index_page',
			type:'post',
			traditional:true,
			async:true,
			data:{
				'city':city
			},
			success:function (data) {
				$("#talkDiv").html(data);
			},
			error:function(){
				alert("系统异常");
			}
		});
	});
	
	//关键字搜索
	$('#search').click(function(){
		 $('.propaganda-tag .city').removeClass('curr');
		var keyWord = $('#searchKeyWord').val();
	//	if(keyWord.length>0){
			$.ajax({
				url:springUrl + '/web/talk/index_pageKeyWord',
				type:'post',
				traditional:true,
				async:true,
				data:{
					'keyWord':keyWord
				},
				success:function (data) {
					$("#talkDiv").html(data);
				},
				error:function(){
					alert("系统异常");
				}
			});
	//	}
	});
});
