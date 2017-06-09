var pageSize = 10;
var totalCount = 0;
$(function () {
	totalCount = $('#totalCount').val();
	if(parseInt(totalCount)>0){
		initCmsContent();
	}
});

function initCmsContent(){
	turnPage(1);
}

/*
 * 翻页方法 根据页码输出翻页菜单
 */
function turnPage(pageNext) {
	pageNext = parseInt(pageNext);
	var showNum = 6;
	var pageCount = Math.ceil(totalCount / pageSize);
	if (pageNext > pageCount || pageNext < 1) {
        alert('页码输入错误！');
        return;
    }
	var pageTag = '<div class="jd-pagination-nav">';
    var pageToPre = "";
    var pageToStart = "";
    var pageToNext = "";
    var pageToEnd = "";
    var pageStart = 0;
    var pageEnd = 0;
    
    if (pageCount <= showNum) {
        pageStart = 1;
        pageEnd = pageCount;
    }else if (pageNext - (Math.ceil((showNum) / 2)) <= 0) {
        pageStart = 1;
        pageEnd = showNum;
    }else if (pageCount - pageNext < Math.floor((showNum / 2))) {
        pageStart = pageCount - showNum + 1;
        pageEnd = pageCount;
    }else {
        pageStart = pageNext - (Math.ceil((showNum) / 2));
        pageEnd = pageStart + showNum - 1;
    }
    
    //组织页码
    for (var i = pageStart; i <= pageEnd; i++) {
        if (i == pageNext) {
            pageTag += '<a href="javascript:;" class="active">' + i + '</a>';
        } else {
            pageTag += '<a href="javascript:;" onclick=turnPage(' + i + ')>' + i + '</a>';
        }
    }
    pageTag+='</div>';
    
    //上一页
    if (pageNext == 1) {
        pageToPre = '<a class="prev disabled" href="javascript:;"><i></i></a>';
        pageToStart = '<a class="toStart disabled" href="javascript:;"><i></i></a>';
    } else {
        pageToPre = '<a class="prev" href="javascript:;" onclick=turnPage(' + (pageNext - 1) + ')><i></i></a>';
        pageToStart = '<a class="toStart" href="javascript:;" onclick=turnPage(1)><i></i></a>';
    }
    
    //下一页
    if (pageNext == pageCount) {
        pageToNext = '<a class="next disabled" href="javascript:;"><i></i></a>';
        pageToEnd = '<a class="toEnd disabled" href="javascript:;"><i></i></a>';
    } else {
        pageToNext = '<a class="next" href="javascript:;" onclick=turnPage(' + (pageNext + 1) + ')><i></i></a>';
        pageToEnd = '<a class="toEnd" href="javascript:;" onclick=turnPage(' + pageCount + ')><i></i></a>';
    }
    
    //组装分页
    var htm = '<div class="jd-pagination">';
    if(pageCount<=showNum){
    	htm += pageTag+'</div>';
    }else{
    	htm += pageToStart
    	   	   +pageToPre
    	   	   +pageTag
    	   	   +pageToNext
    	   	   +pageToEnd
    	   	   +'<input type="text" id="inputPage" value="">'
    	   	   +'<input type="button" id="comPage" value="GO" onclick=inputTurnPage()>'
    	   	   +'</div>';
    }
    
    findCmsRecruithelpContents(pageNext);
    if(pageCount > 1){
    	$('.jd-pagination-wrap').empty();
        $('.jd-pagination-wrap').append(htm);
    }
}

/* 
 * 输入页数翻页
 */
function inputTurnPage() {
    var val = $('#inputPage').val();
    if (checkInt(val)) {
        turnPage(val);
    } else {
        alert('请输入一个整数！');
    }
}

/* 
 * 输入校验  是否为正整数（不包含0）
 */
function checkInt(num) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(num);
}

/*
 * 查询当前分页的招聘帮助内容list
 */
function findCmsRecruithelpContents(pageNext){
	jQuery.ajax({
		type: "POST",
        url: "/web/message/findCmsRecruithelpContents",
        data: {
        	pageIndex: pageNext,
        	pageSize: pageSize
        },
        success: function (data) {
        	if(data.option){
        		var contentList = data.contentList;
        		var htm = "";
        		for(var i=0; i<contentList.length; i++){
        			htm+='<li><div class="list_main">'
        				+'<h2 class="list_name"><a href="/web/message/showCmsRecruithelpDesc?t=9&contentCode='+contentList[i].contentCode+'" target="_blank">'
        				+contentList[i].contentTopic
        				+'</a></h2>'
        				+'<p class="list_time"><i class="clock"></i><span>'
        				+contentList[i].publishTime
        				+'</span></p>'
        				+'<div class="list_ctn"><span class="list_ctn_more"><span class="ellipsis">…</span>'
        				+'<a href="/web/message/showCmsRecruithelpDesc?t=9&contentCode='+contentList[i].contentCode+'" target="_blank">更多>> </a></span>'
        				+contentList[i].contentSummary
        				+'</div></div></li>';
        		}
        		$('#cmsContent').empty();
        		$('#cmsContent').append(htm);
        	}
        },
        error: function () {
            alert('获取帮助内容失败！');
        }
	});
}
