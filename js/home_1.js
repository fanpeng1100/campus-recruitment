$(function(){
	if($('#jobObjFlag').val() == "true"){
		$.each($('.applystatus_cont'), function() {
			var $jobox = $(this);
			var id = $jobox.find('#jobObjectiveId').val();
			showDeail(id);
		});	
	}
});

/*详细内容 */
/*
 								<div class="applystatus_item pass">
        							<div class="valign_wrap">
        								<div class="applystatus_item_name">投递</div> 
        								<div class="applystatus_item_icon"></div>
        								<div class="applystatus_item_status">已投递</div>
        								<div class="applystatus_item_date">2016.06.01</div>
        							</div>
        							<!--[if lt IE 8]><span></span><![endif]-->
        						</div>
 */
function showChengeItemName(phaseStateName){
	var result = "";
	if(phaseStateName=='初筛'){
		result = "投递";
	}else if(phaseStateName=='一面'){
		result = "初试";
	}else if(phaseStateName=='二面'){
		result = "复试";
	}else if(phaseStateName=='三面'){
		result = "HR面试";
	}else if(phaseStateName=='offer'){
		result = "offer审批";
	}else{
		result = phaseStateName;
	}
	return result;
}

function getObjectiveForPhase(objective,phaseState){
	var obj;
	for(var i=0; i<objective.length; i++){
		var objPhaseState = objective[i].phaseState;
		if(objPhaseState == phaseState){
			obj = objective[i];
			break;
		}
	}
	return obj;
}

function showDeail(id){
	var applyTime = $('#applyTimeShow'+id).val();
	$.ajax({
			url: '/web/apply/showMyJob',
			type: "POST",
			dataType : "json",
			data: {
				"jobObjectiveId" : id,
				"applyTime" : applyTime
			},
			success: function(data) {
				var applyJob = eval('(' + data.applyJobJson + ')');
				var phaseStateConfig = $("#phaseStateConfig"+id).val();
				var currentPhaseState = $("#currentPhaseState"+id).val();
				var currentProcessState = $("#currentProcessState"+id).val();
				var phaseState = phaseStateConfig.split(",");
				var contentHtml = "";
				for(var i=0; i< phaseState.length; i++){
					var phaseStateCode = phaseState[i];
					var itemName = showChengeItemName(phaseStateShow[phaseState[i]]);
					var objective = getObjectiveForPhase(applyJob,phaseStateCode);
					if(parseInt(currentPhaseState) < parseInt(phaseStateCode)){//当前投递记录的阶段状态小于config阶段的状态
						contentHtml += "<div class=\"applystatus_item\">";
						contentHtml +=  "<div class=\"valign_wrap\">" +
											"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
											"<div class=\"applystatus_item_icon\"></div>" +
											"<div class=\"applystatus_item_date\"></div>" +
											"<div class=\"applystatus_item_status\"></div>" +
										"</div>" +
										"<!--[if lt IE 8]><span></span><![endif]-->" +
									  "</div>";
					}else if(parseInt(currentPhaseState) > parseInt(phaseStateCode)){//当前投递记录的阶段状态大于config阶段的状态
						if(objective != 'undefined' && objective != null){
							contentHtml += "<div class=\"applystatus_item pass\">";
							contentHtml +=  "<div class=\"valign_wrap\">" +
												"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
												"<div class=\"applystatus_item_icon\"></div>" +
												"<div class=\"applystatus_item_date\">"+objective.createTime+"</div>" +
												"<div class=\"applystatus_item_status\">完成</div>" +
											"</div>" +
											"<!--[if lt IE 8]><span></span><![endif]-->" +
										  "</div>";	
						}else{
							contentHtml += "<div class=\"applystatus_item pass\">";
							contentHtml +=  "<div class=\"valign_wrap\">" +
												"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
												"<div class=\"applystatus_item_icon\"></div>" +
												"<div class=\"applystatus_item_date\"></div>" +
												"<div class=\"applystatus_item_status\"></div>" +
											"</div>" +
											"<!--[if lt IE 8]><span></span><![endif]-->" +
										  "</div>";
						}
					}else if(parseInt(currentPhaseState) == parseInt(phaseStateCode)){//当前投递记录的阶段状态等于config阶段的状态
						if(objective != 'undefined' && objective != null){
							if(currentProcessState == "3" || (currentPhaseState=='1' && currentProcessState=='2')){//未通过
								contentHtml += "<div class=\"applystatus_item failed\">";
								contentHtml +=  "<div class=\"valign_wrap\">" +
													"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
													"<div class=\"applystatus_item_icon\"></div>" +
													"<div class=\"applystatus_item_date\">"+objective.createTime+"</div>" +
													"<div class=\"applystatus_item_status\">未通过</div>" +
												"</div>" +
												"<!--[if lt IE 8]><span></span><![endif]-->" +
											  "</div>";	
							}else if((currentPhaseState=='1' && parseInt(currentProcessState) < 2)
								|| currentPhaseState=='5' 
								|| parseInt(currentProcessState)>0){
								contentHtml += "<div class=\"applystatus_item pass\">";
								contentHtml +=  "<div class=\"valign_wrap\">" +
													"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
													"<div class=\"applystatus_item_icon\"></div>" +
													"<div class=\"applystatus_item_date\">"+objective.createTime+"</div>" +
													"<div class=\"applystatus_item_status\">"+objective.objectiveName+"</div>" +
												"</div>" +
												"<!--[if lt IE 8]><span></span><![endif]-->" +
											  "</div>";	
							}else{
								contentHtml += "<div class=\"applystatus_item\">";
								contentHtml +=  "<div class=\"valign_wrap\">" +
													"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
													"<div class=\"applystatus_item_icon\"></div>" +
													"<div class=\"applystatus_item_date\"></div>" +
													"<div class=\"applystatus_item_status\"></div>" +
												"</div>" +
												"<!--[if lt IE 8]><span></span><![endif]-->" +
											  "</div>";
							}
						}else{
							contentHtml += "<div class=\"applystatus_item\">";
							contentHtml +=  "<div class=\"valign_wrap\">" +
												"<div class=\"applystatus_item_name\">"+itemName+"</div>" +
												"<div class=\"applystatus_item_icon\"></div>" +
												"<div class=\"applystatus_item_date\"></div>" +
												"<div class=\"applystatus_item_status\"></div>" +
											"</div>" +
											"<!--[if lt IE 8]><span></span><![endif]-->" +
										  "</div>";
						}
					}
				}
				$("#jobBoxContent"+id).append(contentHtml);
			},
			error: function() {
				alert("出了点问题，稍等下！...");
			}
		});
}


//招聘职位
function doJobIndex(code,name){
	var url = "/web/job/job_index?t=6&dicCode="+code+"&dicName="+name;
	window.location.href = encodeURI(url);
}