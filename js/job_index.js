var pageSize =6;
var interviewPlaceArray = [];
var interviewPlaceNameArray = [];
$(function() {
	 // 解析 query 字符串
	  var pairs = window.location.search.substring(1).split("&"),
	        query = {};
	  for (var i in pairs) {
	    if ( pairs[i] === "" ) continue;

	    pair = pairs[i].split("=");

	    var key = decodeURIComponent( pair[0] );
	    if (query[key] === undefined) {
	      query[key] = decodeURIComponent(pair[1]);
	    }
	    else {
	      if (!$.isArray(query[key]))
	        query[key] = [query[key]];
	      query[key].push(decodeURIComponent(pair[1]));
	    }
	  }

	  if (query.ptype) { 
	    if ($.isArray(query.ptype)) {
	      $.each(query.ptype, function(ptype) {
	        //setCheckboxValue('jType', ptype);
	    	  setCheckboxValue('ptype', ptype);
	      });
	    } else {
	      //setCheckboxValue('jType', query.ptype);
	    	setCheckboxValue('ptype', query.ptype);
	    }
	  }
	   
	//复选框获取值
	$('.jd-checkboxes').on('click', function () {
		//jobCategory
		var jobCategoryCode = $("#postHidden").val();
		var jobCategoryValues = [];
		jobCategoryValues.push(jobCategoryCode);
		
		//city
		var cityCode = $("#siteHidden").val();
		var cityValues = [];
		cityValues.push(cityCode);
		
		/*var self = $("#jobType");
		  var checked = self.find(':checked');
		  var jobTypeValues = [];
		  $.each(checked, function () {
			  jobTypeValues.push($(this).val());
		  });*/
		//  console.log(jobTypeValues);
		  /*var self = $('#jobCategory');
		  var checked = self.find(':checked');
		  var jobCategoryValues = [];
		  $.each(checked, function () {
			  jobCategoryValues.push($(this).val());
		  });*/
		//  console.log(jobCategoryValues);
		  /*var self = $("#city");
		  var checked = self.find(':checked');
		  var cityValues = [];
		  $.each(checked, function () {
			  cityValues.push($(this).val());
		  });*/
		  //公司
		  /*var self = $("#company");
		  var checked = self.find(':checked');
		  var companyValues = [];
		  $.each(checked, function () {
			  companyValues.push($(this).val());
		  });*/
		//  console.log(companyValues);
		  //var seachParam=$("#seachParam").val();
		//获取职位列表信息
			jQuery.ajax({
					type : "POST",
					cache : false,
					url : "/web/job/job_list",
					data : {
						//"jobTypeValues" : jobTypeValues.toString(),
						"jobCategoryValues" : jobCategoryValues.toString(),
						"cityValues" :cityValues.toString(),
						//"companyValues":companyValues.toString(),
						//"seachParam":seachParam,
						"pageNum":$('#pageNo').val(),
						"pageSize":pageSize
					},
					success : function(data) {	
//						alert("获取职位列表信息 1 复选框获取值");
						$("#count").val(data.count);
						setInitialPage(data.count);
						var html="";	
						var ul = $('.recruit-job-list');	
				        ul.find('li').remove();
						// 解析数组
						$.each(data.jobList,function(i, item) {
							var companys = "";
							$.each(item.jobCompanyList,function(k, company) {
								  if(item.jobCompanyList.length-1 == k){
									  companys += company.companyName;
								  }else{
									  companys += company.companyName+',';
								   }
						    });
							
							interviewPlaceArray[i]=item.interviewPlace;//面试城市
							interviewPlaceNameArray[i]=item.interviewPlaceName;//面试城市

							var value = "";
							if(item.departmentName!=null 
									&& item.departmentName!=''){
								value = '-'+item.departmentName;
							}
							var jobNum = item.requireNum ;
							var v_string = "若干" ;
							if(jobNum == 0){
								jobNum = v_string ;
							}
							html += '<li class="recruit-job-box">'+
						        '<div class="recruit-box-main">'+
						          '<div class="recruit-box-title">'+
						            '<a>'+item.jobName+'</a>'+
						            '<span>'+item.jobCategoryName+'</span>'+
						          '</div>'+
						          '<ul class="recruit-box-cities">'+
						            '<li>工作地：'+item.workingPlaceName+'</li>'+				     
						          '</ul>'+
						          '<div class="recruit-box-position">'+
						          	  '<span>'+companys+'</span>'+
						          '</div>'+
						          '<div class="recruit-box-notes">'+
						            '<span>'+item.description+'</span>'+
						          '</div>'+
						        '</div>'+
	
						        '<div class="recruit-box-side">'+
						          '<button class="recruit-apply-btn" onClick="applyJob(\''+item.id+'\',\''+item.jobName+'\',\''+i+'\');" onmouseover="this.style.cursor=\'pointer\'">立即申请</button>'+
						          //'<div class="recruit-apply-desc">招聘人数:'+jobNum+'</div>'+
						          '<div class="detail">'+
						            '<a  href="/web/job/job_detail?jobId='+item.id+'" class="see-more">详细</a>'+
						          '</div>'+
						        '</div>'+
						      '</li>';
						}); 	
						 if(html!=""){				    						        
						        ul.append(html);
						        $.each($('.recruit-box-notes > span'), function() {						   		
						   		    $clamp(this, {clamp: 3});
						   		  });
					    }	
					},
					error : function(data) {
						alert("程序异常，获取职位失败！");
					}
				});
		});
	//搜索事件响应
	$('#seachJob').on('click', function () {
		//jobCategory
		var jobCategoryCode = $("#postHidden").val();
		var jobCategoryValues = [];
		jobCategoryValues.push(jobCategoryCode);
		
//		当清空搜索框去掉筛选条件
		if($("#searchDicName").val() == ''){
			jobCategoryValues = [];
		}
		
		//city
		var cityCode = $("#siteHidden").val();
		var cityValues = [];
		cityValues.push(cityCode);
		
		//获取职位列表信息
			jQuery.ajax({
					type : "POST",
					cache : false,
					url : "/web/job/job_list",
					data : {
						//"jobTypeValues" : jobTypeValues.toString(),
						"jobCategoryValues" : jobCategoryValues.toString(),
						"cityValues" :cityValues.toString(),
						//"companyValues":companyValues.toString(),
						//"seachParam":seachParam,
						"pageNum":$('#pageNo').val(),
						"pageSize":pageSize
					},
					success : function(data) {
						$("#count").val(data.count);
						$("#count").val(data.count);
						var ul = $('.recruit-job-list');	
				        ul.find('li').remove();
				        setInitialPage(data.count);
						var html="";			
						// 解析数组
						$.each(data.jobList,function(i, item) {
							var companys = "";
							$.each(item.jobCompanyList,function(k, company) {
								  if(item.jobCompanyList.length-1 == k){
									  companys += company.companyName;
								  }else{
									  companys += company.companyName+',';
								   }
						    });
							interviewPlaceArray[i]=item.interviewPlace;//面试城市
							interviewPlaceNameArray[i]=item.interviewPlaceName;//面试城市
							
							var value = "";
							if(item.departmentName!=null 
									&& item.departmentName!=''){
								value = '-'+item.departmentName;
							}
							var jobNum = item.requireNum ;
										var v_string = "若干" ;
										if(jobNum == 0){
											jobNum = v_string ;
										}
							html += '<li class="recruit-job-box">'+
						        '<div class="recruit-box-main">'+
						          '<div class="recruit-box-title">'+
						            '<a>'+item.jobName+'</a>'+
						            '<span>'+item.jobCategoryName+'</span>'+
						          '</div>'+
						          '<ul class="recruit-box-cities">'+
						            '<li>工作地：'+item.workingPlaceName+'</li>'+				     
						          '</ul>'+
						          '<div class="recruit-box-position">'+
						            '<span>'+companys+'</span>'+
						          '</div>'+
						          '<div class="recruit-box-notes">'+
						            '<span>'+item.description+'</span>'+
						          '</div>'+
						        '</div>'+
	
						        '<div class="recruit-box-side">'+
						          '<button class="recruit-apply-btn" onClick="applyJob(\''+item.id+'\',\''+item.jobName+'\',\''+i+'\');" onmouseover="this.style.cursor=\'pointer\'">立即申请</button>'+
						          //'<div class="recruit-apply-desc">招聘人数:'+jobNum+'</div>'+
						          '<div class="detail">'+
						            '<a  href="/web/job/job_detail?jobId='+item.id+'" class="see-more">详细</a>'+
						          '</div>'+
						        '</div>'+
						      '</li>';			
						}); 	
						 if(html!=""){	
						        ul.append(html);
						        $.each($('.recruit-box-notes > span'), function() {						   		
						   		    $clamp(this, {clamp: 3});
						   		  });
					    }	
					},
					error : function(data) {
						alert("程序异常，获取职位失败！");
					}
				});
	});
	
	
	
	$('#seachParamDel').on('click', function () {
		//jobCategory
		$("#postHidden").val("");
		$("#searchDicName").val("");
		var jobCategoryValues = [];
		
		//city
		$("#siteHidden").val("");
		$("#searchWrokPlaceName").val("");
		var cityValues = [];
		
		//获取职位列表信息
			jQuery.ajax({
					type : "POST",
					cache : false,
					url : "/web/job/job_list",
					data : {
						"jobCategoryValues" : jobCategoryValues.toString(),
						"cityValues" :cityValues.toString(),
						"pageNum":$('#pageNo').val(),
						"pageSize":pageSize
					},
					success : function(data) {
//						alert("获取职位列表信息 2 搜索事件响应");
						$("#count").val(data.count);
						$("#count").val(data.count);
						var ul = $('.recruit-job-list');	
				        ul.find('li').remove();
				        setInitialPage(data.count);
						var html="";			
						// 解析数组
						$.each(data.jobList,function(i, item) {
							var companys = "";
							$.each(item.jobCompanyList,function(k, company) {
								  if(item.jobCompanyList.length-1 == k){
									  companys += company.companyName;
								  }else{
									  companys += company.companyName+',';
								   }
						    });
							interviewPlaceArray[i]=item.interviewPlace;//面试城市
							interviewPlaceNameArray[i]=item.interviewPlaceName;//面试城市
							
							var value = "";
							if(item.departmentName!=null 
									&& item.departmentName!=''){
								value = '-'+item.departmentName;
							}
							var jobNum = item.requireNum ;
										var v_string = "若干" ;
										if(jobNum == 0){
											jobNum = v_string ;
										}
							html += '<li class="recruit-job-box">'+
						        '<div class="recruit-box-main">'+
						          '<div class="recruit-box-title">'+
						            '<a>'+item.jobName+'</a>'+
						            '<span>'+item.jobCategoryName+'</span>'+
						          '</div>'+
						          '<ul class="recruit-box-cities">'+
						            '<li>工作地：'+item.workingPlaceName+'</li>'+				     
						          '</ul>'+
						          '<div class="recruit-box-position">'+
						            '<span>'+companys+'</span>'+
						          '</div>'+
						          '<div class="recruit-box-notes">'+
						            '<span>'+item.description+'</span>'+
						          '</div>'+
						        '</div>'+
	
						        '<div class="recruit-box-side">'+
						          '<button class="recruit-apply-btn" onClick="applyJob(\''+item.id+'\',\''+item.jobName+'\',\''+i+'\');" onmouseover="this.style.cursor=\'pointer\'">立即申请</button>'+
						          //'<div class="recruit-apply-desc">招聘人数:'+jobNum+'</div>'+
						          '<div class="detail">'+
						            '<a  href="/web/job/job_detail?jobId='+item.id+'" class="see-more">详细</a>'+
						          '</div>'+
						        '</div>'+
						      '</li>';			
						}); 	
						 if(html!=""){	
						        ul.append(html);
						        $.each($('.recruit-box-notes > span'), function() {						   		
						   		    $clamp(this, {clamp: 3});
						   		  });
					    }	
					},
					error : function(data) {
						alert("程序异常，获取职位失败！");
					}
				});
	});
	
	$('#hotJob').on('click', function () {
		$('#hotType').val('yes');
		$('#seachJob').click(); 
	});
	//获取职位列表信息
	$('#seachJob').click(); 
	
	var $confirmBtn = $('#popup3 .jd-confirm-btn');
	var $cancelBtn = $('#popup3 .jd-cancel-btn');
	$cancelBtn.on('click', function() {
		$('.jd-full-mask').addClass('hide');
		$('.jd-popup-box').addClass('hide');
		$('input[name*=\'zy\']').attr("checked", false);// 设置成未选中
//		$('input[name="zy1"]').attr("checked", false);// 设置成未选中
//		$('input[name="zy2"]').attr("checked", false);// 设置成未选中
//		$('input[name="zy3"]').attr("checked", false);// 设置成未选中
	});
	
	$confirmBtn.on('click', function() {
		var self = $("#VolunteerCategories");
	    var checked = self.find(':checked');
	    var jobTypeValues = [];
		$.each(checked, function () {
		  jobTypeValues.push($(this).val());
		});
		if(jobTypeValues.length==1){
			var jobId = $('#jobId').val();
			var jobName=$('#jobName').val();
			submitApplyJob(jobId,jobName,jobTypeValues.toString());
		}else if(jobTypeValues.length==0){
			alert("您好,请您选择一个面试城市!");
		}else if(jobTypeValues.length!=1){
			alert("您好,只能选择一个面试城市!");
		}
	});
	 //分公司那些超过5个字的地方 变成单行展示
	  $('.jd-checkbox').each(function() {
		    var len = $(this).find('label').text().length;
		    if (len > 5) {
		      $(this).css('width', '100%');
		    }
		  });	  
});

function clickInterviewPlace(index){
	$("[name = 'zy']:checkbox").each(function () {
		var id = $(this).prop("id");
		if(id != 'zy'+index){
			$(this).attr("checked",false); 
		}else{
			if($(this).attr("checked")){
				$(this).attr("checked",false); 
			}else{
				$(this).attr("checked",true); 
			}
		}
	});
	
}

function setCheckboxValue (name, value) {
  $('input[name="' + name + '"][value="'+value+'"]').attr('checked', true);
}

//志愿选择弹出窗口
function applyJob(jobId,jobName,index){
//	设置面试城市 begin ++++++++++++++++++++++++++++++++++++++++++++++
	var ul = $('#interviewPlaces');	
    ul.find('li').remove();
    var tempInterviewPlace = interviewPlaceArray[index];
    var tempInterviewPlaceName = interviewPlaceNameArray[index];
    if(tempInterviewPlace != null && tempInterviewPlace != null){
    	 var tempInterviewPlaceArray = tempInterviewPlace.split(',');
    	 var tempInterviewPlaceNameArray = tempInterviewPlaceName.split(',');
    	 var html = "";
    	 $.each(tempInterviewPlaceArray,function(i, item) {
    		 html += '<li class="jd-checkboxes-ul-li-multi-list">' +
    					'<div id="zy'+i+'" onclick=clickInterviewPlace(\''+i+'\') class="jd-checkbox">' +
    						'<input id="zy'+i+'" name="zy" type="checkbox" value="'+item+'" >' +
    						'<label>'+tempInterviewPlaceNameArray[i]+'</label>' +
    					'</div>' +
    				'</li>';
    	 });	    
    	 ul.append(html);
    }else{
    	ul.append("<li style=\"list-style-type: none;\"><label style=\"color:gray;\">该职位暂未发布面试城市</label></li>");
    }
//	设置面试城市 end ++++++++++++++++++++++++++++++++++++++++++++++
	
	$('#jobId').val(jobId);
	$('#jobName').val(jobName);
	// 弹出窗口
	$('.jd-full-mask').removeClass('hide');
	$('#popup3').removeClass('hide');

	// 计算弹出框的高度，确保框处于居中位置
	var wh = $(window).height();
	var ch = $('#popup3').height();
	$('#popup3').css('top', wh > ch ? (wh-ch) / 2 : 0);
}; 

//页面标签触发
function getJobListForPage(pageNum){
	//jobCategory
	var jobCategoryCode = $("#postHidden").val();
	var jobCategoryValues = [];
	jobCategoryValues.push(jobCategoryCode);
	
	//city
	var cityCode = $("#siteHidden").val();
	var cityValues = [];
	cityValues.push(cityCode);
	
	//获取职位列表信息
		jQuery.ajax({
				type : "POST",
				cache : false,
				url : "/web/job/job_list",
				data : {
					//"jobTypeValues" : jobTypeValues.toString(),
					"jobCategoryValues" : jobCategoryValues.toString(),
					"cityValues" :cityValues.toString(),
					//"companyValues":companyValues.toString(),
					//"seachParam":seachParam,
					"pageNum":pageNum,
					"pageSize":pageSize
				},
				success : function(data) {
//					alert("获取职位列表信息 3 页面标签触发");
					$("#count").val(data.count);
					var ul = $('.recruit-job-list');	
			        ul.find('li').remove();			
					var html="";			
					// 解析数组
					$.each(data.jobList,function(i, item) {
						var companys = "";
						$.each(item.jobCompanyList,function(k, company) {
							  if(item.jobCompanyList.length-1 == k){
								  companys += company.companyName;
							  }else{
								  companys += company.companyName+',';
							   }
					    });
						
						interviewPlaceArray[i]=item.interviewPlace;//面试城市
						interviewPlaceNameArray[i]=item.interviewPlaceName;//面试城市
						
						var value = "";
						if(item.departmentName!=null 
								&& item.departmentName!=''){
							value = '-'+item.departmentName;
						}
						var jobNum = item.requireNum ;
						var v_string = "若干" ;
						if(jobNum == 0){
							jobNum = v_string ;
						}
						html += '<li class="recruit-job-box">'+
					        '<div class="recruit-box-main">'+
					          '<div class="recruit-box-title">'+
					            '<a>'+item.jobName+'</a>'+
					            '<span>'+item.jobCategoryName+'</span>'+
					          '</div>'+
					          '<ul class="recruit-box-cities">'+
					            '<li>工作地：'+item.workingPlaceName+'</li>'+				     
					          '</ul>'+
					          '<div class="recruit-box-position">'+
					            '<span>'+companys+'</span>'+
					          '</div>'+
					          '<div class="recruit-box-notes">'+
					            '<span>'+item.description+'</span>'+
					          '</div>'+
					        '</div>'+

					        '<div class="recruit-box-side">'+
					          '<button class="recruit-apply-btn" onClick="applyJob(\''+item.id+'\',\''+item.jobName+'\',\''+i+'\');" onmouseover="this.style.cursor=\'pointer\'">立即申请</button>'+
					          //'<div class="recruit-apply-desc">招聘人数:'+jobNum+'</div>'+
					          '<div class="detail">'+
					            '<a  href="/web/job/job_detail?jobId='+item.id+'" class="see-more">详细</a>'+
					          '</div>'+
					        '</div>'+
					      '</li>';			
					}); 	
					 if(html!=""){	
					        ul.append(html);
					        $.each($('.recruit-box-notes > span'), function() {			
					   		    $clamp(this, {clamp: 3});
					   		  });
				    }	
				},
				error : function(data) {
					alert("程序异常，获取职位失败！");
				}
			});
}


/**
 * 申请职位信息
 * @param jobId
 * @param jobName
 */
var submitFlag = true;
function submitApplyJob(jobId,jobName,interviewPlace){
	if(!submitFlag)return;
	submitFlag = false;
	 if($('#loginType').val()=="no"||$('#loginType').val()=="no"){//判断是否登录
		 location.href = "/web/job_apply/job_index?t=6";
		 submitFlag = true;
	 }else{
		if(confirm("信息确认：请确认申请\"" + jobName + "\"职位！注：进入筛选后简历将不可修改！")) {
			jQuery.ajax({
					type : "POST",
					cache : false,
					url : "/web/job_apply/job_apply",
					data : {
						"jobId" : jobId,
						"jobName" :jobName,
//						"zyType" :zyType
						"interviewPlace" : interviewPlace
					},
					success : function(data) {
						submitFlag = true;
						if(data.succeed){
							alert(data.msg);
							$('.jd-full-mask').addClass('hide');
							$('.jd-popup-box').addClass('hide');
							
						}else{
							alert(data.msg);
                            if(data.errorCode=="01"){//当编码为01时，则表示简历未填写或不完整，则跳转至简历管理页面
                            	var fxType = data.fxType;
                            	location.href = "/web/resume/resume_index?fxType="+fxType;
							}
						}
					},
					error : function(data) {
						submitFlag = true;
						alert("程序异常，申请职位失败！");
					}
				});
		 }else {
			submitFlag = true;
		}
	 }
}

//设置初始页面信息
function setInitialPage(count){
	var pageCount =Math.ceil(count / pageSize);//向上整除 4/3=2;
	var html="";
	if(pageCount==0){
		html="";
	}else if(pageCount>5){
		html= '<a class="prev disabled" href="javascript:;"></a>'+
	     '<div class="jd-pagination-nav">'+
	       '<a onclick="clickPage(this)" href="javascript:;" class="active">1</a>'+
	       '<a onclick="clickPage(this)" href="javascript:;">2</a>'+
	       '<a onclick="clickPage(this)" href="javascript:;">3</a>'+
	       '<a onclick="clickPage(this)" href="javascript:;">4</a>'+
	       '<a onclick="clickPage(this)" href="javascript:;">5</a>'+
	     '</div>'+
	     '<a onclick="nextPage();" class="next" href="javascript:;"></a>';
	}else{
		html= '<a class="prev disabled" href="javascript:;"></a>'+
	     '<div class="jd-pagination-nav">';
		for(var i=1;i<=pageCount;i++){
			if(i==1){
				html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+i+'</a>';
			}else{
				html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
			}
		}
		html+='</div>';
		if(pageCount==1){//当只有1页的时候，标示成灰色，且不能点击
			html+='<a class="next disabled" href="javascript:;"></a>';
		}else{
			html+='<a onclick="nextPage();" class="next" href="javascript:;"></a>';
		}
	}
	var page = $('.jd-pagination');	
	page.find('div').remove();
	page.find('a').remove();
	if(html!=""){
		page.append(html);
	}
	
}


//箭头翻下一页
function nextPage(){
	var count=$("#count").val();
	var current=$('.active').text();
	var pageNum=parseInt(current)+1;//下一页进入的页码
	this.packagePage(count,pageNum,pageSize);
}

//箭头翻上一页
function prevPage(){
	var count=$("#count").val();
	var current=$('.active').text();
	var pageNum =parseInt(current)-1;//上一页进入的页码
	this.packagePage(count,pageNum,pageSize);
}

//直接点击页面值
function clickPage(obj){
	var count=$("#count").val();
	var pageNum=$(obj).text();//当前选中的页码
	this.packagePage(count,pageNum,pageSize);
}

/**
 * 组装翻页信息方法
 * @param count 总记录数
 * @param pageNum 指定跳转的页码
 * @param pageSize 每页显示记录数
 */
function packagePage(count,pageNum,pageSize){
	var pageCount =Math.ceil(count / pageSize);//总页码
	var html="";
	if(pageCount>5){//总页数大于5
		var differenceValue =pageCount-pageNum;//判断当前页面和总数的差距
		if(differenceValue>=2&&pageNum>2){//当前页和总页差值大于等于2时，且当前页为第三页以上（即大于2）
			html+= '<a onclick="prevPage();" class="prev" href="javascript:;"></a>'+
	        '<div class="jd-pagination-nav">';
	    	for(var i=parseInt(pageNum)-2;i<parseInt(pageNum);i++){
	    		html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    	}
	    	html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+pageNum+'</a>';
	    	for(var i=parseInt(pageNum)+1;i<parseInt(pageNum)+3;i++){
	    		html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    	}
	    	html+= '</div>'+
	         '<a onclick="nextPage();" class="next" href="javascript:;"></a>';
	    	var page = $('.jd-pagination');	
	    	page.find('div').remove();
	    	page.find('a').remove();
	    	page.append(html);
		}else if(differenceValue>=2&&pageNum<3){//当前页和总页差值大于等于2时，且当前页为第三页以下（即小于3）
			if(pageNum==1){
				html+= '<a class="prev disabled" href="javascript:;"></a>'+
		        '<div class="jd-pagination-nav">';
			}else{
				html+= '<a onclick="prevPage();" class="prev" href="javascript:;"></a>'+
		        '<div class="jd-pagination-nav">';
			}
	    	for(var i=1;i<parseInt(pageNum);i++){
	    		html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    	}
	    	html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+pageNum+'</a>';
	    	for(var i=parseInt(pageNum)+1;i<=parseInt(pageNum)+(5-parseInt(pageNum));i++){//设置为显示5个
	    		html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    	}
	    	html+= '</div>'+
	         '<a onclick="nextPage();" class="next" href="javascript:;"></a>';
	    	var page = $('.jd-pagination');	
	    	page.find('div').remove();
	    	page.find('a').remove();
	    	page.append(html);
		}else if(differenceValue==0){//若差值为0,则表示当前页即为最大页
			if(pageNum==1){
	    		html+= '<a class="prev disabled" href="javascript:;"></a>';
	    	}else{
	    		html+= '<a onclick="prevPage();" class="prev" href="javascript:;"></a>';
	    	}
	    	html+= '<div class="jd-pagination-nav">';
	    	for(var i=parseInt(pageNum)-4;i<parseInt(pageNum);i++){
	    		if(i>0){
	    			html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    		}
	    	}
	    	html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+pageNum+'</a>';
	    	html+= '</div>'+
	         '<a class="next disabled" href="javascript:;"></a>';
	    	var page = $('.jd-pagination');	
	    	page.find('div').remove();
	    	page.find('a').remove();
	    	page.append(html);
		}else if(differenceValue==1){//若差值为1
			if(pageNum==1){
	    		html+= '<a class="prev disabled" href="javascript:;"></a>';
	    	}else{
	    		html+= '<a onclick="prevPage();" class="prev" href="javascript:;"></a>';
	    	}
	    	html+= '<div class="jd-pagination-nav">';
	    	for(var i=parseInt(pageNum)-3;i<parseInt(pageNum);i++){
	    		if(i>0){
	    			html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
	    		}
	    	}
	    	html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+pageNum+'</a>';
	    	html+='<a onclick="clickPage(this)" href="javascript:;">'+pageCount+'</a>';
	    	html+= '</div>'+
	         '<a onclick="nextPage();" class="next" href="javascript:;"></a>';
	    	var page = $('.jd-pagination');	
	    	page.find('div').remove();
	    	page.find('a').remove();
	    	page.append(html);
		}
	}else{//总页数小于5
		    	if(pageNum==1){
		    		html+= '<a class="prev disabled" href="javascript:;"></a>';
		    	}else{
		    		html+= '<a onclick="prevPage();" class="prev" href="javascript:;"></a>';
		    	}
		    	html+= '<div class="jd-pagination-nav">';
		    	for(var i=1;i<parseInt(pageNum);i++){
		    		if(i>0){
		    			html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
		    		}
		    	}
		    	html+='<a onclick="clickPage(this)" href="javascript:;" class="active">'+pageNum+'</a>';
		    	
		    	for(var i=parseInt(pageNum)+1;i<=pageCount;i++){
		    		html+='<a onclick="clickPage(this)" href="javascript:;">'+i+'</a>';
		    	}
		    	if(pageNum==pageCount){
		    		html+= '</div>'+
			         '<a class="next disabled" href="javascript:;"></a>';
		    	}else{
		    		html+= '</div>'+
			         '<a onclick="nextPage();" class="next" href="javascript:;"></a>';
		    	}
		    	var page = $('.jd-pagination');	
		    	page.find('div').remove();
		    	page.find('a').remove();
		    	page.append(html);
	}
   
	this.getJobListForPage(pageNum);  
}


//点击外部时收起输入框下边的框
$(document).mouseup(function(e){
    var _con = $('.recruit-search-inp-post');   // 设置目标区域
    if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
      $('.recruit-search-inp-post .recruit-search-inp-pop').hide();
    }
    _con = $('.recruit-search-inp-site');
    if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
      $('.recruit-search-inp-site .recruit-search-inp-pop').hide();
    }
});

//20160701 模拟搜索场景
$('.recruit-search-inp-post input').on('focus', function() {
	$('.recruit-search-inp-pop.classify').show();
}).on('keyup', function() {
    if($(this).val()) {
      $('.recruit-search-inp-pop.classify').hide();
      $('.recruit-search-inp-pop.post').show();
    } else {
      $('.recruit-search-inp-pop.classify').show();
      $('.recruit-search-inp-pop.post').hide();
    }
});
$('.recruit-search-inp-pop.classify').on('click', '.recruit-search-inp-pop-item', function() {
    $('.recruit-search-inp-pop.classify').hide();
    var rootJobCode = $(this).attr('id');
    jQuery.ajax({
		type : "POST",
		cache : false,
		url : "/web/job/job_categorys",
		data : {
			"rootJobCode" : rootJobCode
		},
		success : function(data) {
			var ul = $('#jobcategory');
		    ul.find('li').remove();
			
			var html="";
			$.each(data.jobCategorys,function(i, item) {
				html+= "<li class='recruit-search-inp-pop-item' id='"+item.dictDataCode+"'>"+item.dictDataName+"</li>";
							
			}); 	
			if(html!=""){	
				ul.append(html);
		    }	
		},
		error : function(data) {
		}
	});
    $('.recruit-search-inp-pop.post').show();
});
$('.recruit-search-inp-pop.post').on('click', '.recruit-search-inp-pop-item', function() {
    $('.recruit-search-inp-pop.post').hide();
    $('.recruit-search-inp-post input').val($(this).text());
    $('#postHidden').val($(this).attr('id'));
});


$('.recruit-search-inp-site input').on('focus', function() {
    $('.recruit-search-inp-pop.site').show();
});
$('.recruit-search-inp-pop.site').on('click', '.recruit-search-inp-pop-item', function() {
    $('.recruit-search-inp-pop.site').hide();
    $('.recruit-search-inp-site input').val($(this).text());
    $('#siteHidden').val($(this).attr('id'));
});


