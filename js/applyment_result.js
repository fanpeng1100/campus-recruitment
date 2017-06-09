var cNum ;
var SHOWPAGES = 6 ;
var totalCount = $("#totalCount").val();

$(function(){
		cNum = $("#cNum").val() ;
		$("a:contains(" + cNum + ")").addClass("curr");
	});

function expand(pageNextNum) {
	if (($("a:contains(" + pageNextNum + ")")).length <= 0) {
		var aStr = "" ;
		
		var z = Math.ceil(pageNextNum/SHOWPAGES) ;
		var len = z * SHOWPAGES ;
		
		if (len > totalCount) {
			for (var i=((z-1)*SHOWPAGES + 1); i<= totalCount; i++) {
				aStr += '<a onclick="toPageSearch(' + i + ')" href="javascript:void(0);">' + i + '</a>'
			}			
		}else {
			for (var i=((z-1)*SHOWPAGES + 1); i<= len; i++) {
				aStr += '<a onclick="toPageSearch(' + i + ')" href="javascript:void(0);">' + i + '</a>'
			}
			var eStr = '<span><a onclick="expand(' + (len + 1) + ')" href="javascript:void(0);">...</a></span>';
			aStr = aStr + eStr ;
		}
		
		$("#pageSpan>span").remove();
		$("#pageSpan").append(aStr);		
	}
}

//申请职位
function toApply(jobId , jobName) {
	if(jobId == null || jobId == ""){
		alert("暂未开放申请");
	}else{
		$.ajax({
			url : "/web/apply/toApply",
			type : "POST",
			cache : false,
			async : false,
			data : {"jobId":jobId , "jobName":jobName},
			dataType : "json",
			success : function(data) {
				//0---简历不完整  1---超过2个  2---插入成功  3---简历进行其它阶段  4---可以申请
				if (data.RTNMSG == "00") {
					alert("您未填写简历信息，请填写简历后进行投递！");	
					location.href = "/web/resume/resume_index" ;								
				}else if(data.RTNMSG == "0"){
					alert("您的简历信息不完整，"+data.info+"完善后进行投递！");	
					location.href = "/web/resume/resume_index" ;	
				}
				else if(data.RTNMSG == "1"){
					alert("您已经申请过两个职位，不能再申请啦");
				}else if(data.RTNMSG == "2"){
					//Dialog.alert("消息提示", "您的简历已经提交，请等待HR消息");
					//跳转到职位申请页面
					location.href = "/web/apply/myjob" ;
				}else if(data.RTNMSG == "3"){
					alert("您已经申请过其它职位并已提交申请，不能再申请其它职位");
				}else if(data.RTNMSG == "4"){
					//Dialog.alert("消息提示", "第二个职位申请成功，请等待HR消息");
					location.href = "/web/apply/myjob" ;
				}else if(data.RTNMSG == "6"){
					alert("您已经申请过该职位，请选择其它职位！");
				}else {
					alert("出了点问题，稍等下！...");
				}
			},
			error : function(data) {
				alert("程序异常结束!");
			}

		});
	}
}


//触发分页查询操作
function toPageSearch(page) {
	var workingPlace = $("#workingPlace").val() ;
	var jobCategoryCode = $("#jobCategoryCode").val() ;
	var companyCode = $("#companyCode").val() ;
//分页相关参数	
	var iDisplayLength = $("#iDisplayLength").val() ;

	var iDisplayStart = ((page-1) * iDisplayLength) + 1;
	var iSortingCols = 0 ;
	var iColumns = 1 ;
	var mDataProp_0 = "";
	var sEcho = "ssss";
	var params = "iDisplayStart=" + iDisplayStart + "&iDisplayLength=" +iDisplayLength+ "&iSortingCols=" +iSortingCols + "&iColumns=" + iColumns+ "&mDataProp_0=" + mDataProp_0 + "&sEcho=" +sEcho 
					+"&workingPlace=" +workingPlace
					+"&jobCategoryCode=" +jobCategoryCode
					+"&companyCode=" +companyCode
	if (cNum != page) {  //当前页不跳转
		$("#jobList").load("/web/apply/toSearchJob?" + params);	
	}				
		
	
//	var params = {"iDisplayStart":iDisplayStart ,"iDisplayLength":iDisplayLength, "iSortingCols":iSortingCols , "iColumns" : iColumns, "mDataProp_0" :mDataProp_0 , "sEcho":sEcho 
//					,"workingPlace":workingPlace
//					,"jobCategoryCode":jobCategoryCode
//					,"companyCode":companyCode
//				};
				
//	$.post(urlpara , params, function(data) {
//			//alert("post成功返回___" + data);
//			$("#d_result").load("/apply/applyment_result?data=" + data);	
//			return false ;		
//		});
				
//	$.ajax({
//		url : urlpara,
//		type : "POST",
//		cache : false,
//		async : false,
//		data : params,
//		dataType : "json",
//		success : function(data) {
//			alert("成功返回___" + data);
//			$("#d_result").load("/apply/applyment_result");	
//			return false ;		
//		},
//		error : function(data) {
//			alert("失败", "程序异常结束!");
//		}
//
//	});
}


