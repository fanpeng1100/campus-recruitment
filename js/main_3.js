function userSelect(){var a=$(".J-login-list");a.bind("mouseenter mouseleave",function(){$(this).toggleClass("login-list-target")})}function subNav(){var a,b=$(".J-nav-sub");b.bind("mouseenter",function(){$(this).next("div.J-nav-sub-list").show()}),b.bind("mouseleave",function(){var b=$(this);a=setTimeout(function(){b.next("div.J-nav-sub-list").hide()},100)}),$(".J-nav-sub-list").bind("mouseenter",function(){clearTimeout(a)}),$(".J-nav-sub-list").bind("mouseleave",function(){$(this).hide()})}function positionExpand(){var a=$(".position-detail-desc");a.bind("click",function(){$(this).toggleClass("position-detail-collapsed")})}function groupTabWidth(){var a=$(".position-group-tab-wrapper"),b=a.find("li"),c=b.length,d=$(".position-wrapper").width(),e=20,f=100*e*(c-1)/d/c+"%",g=(d-e*(c-1))/c,h=100*g/d+"%";b.each(function(a){$(this).css({width:h,"margin-right":f}),a===c-1&&$(this).css({"margin-right":0})})}function positionDetailExpand(){$(".position-program-member-item").bind("click","em",function(){var a=$(this).index();$(".position-program-member-detail-item").eq(a).fadeIn()}),$(".position-program-member-detail-item").bind("click","b",function(){$(this).fadeOut()})}userSelect(),subNav(),positionExpand(),groupTabWidth();var quiz={init:function(){var a=this;a.bindHandler()},bindHandler:function(){var a=this;$("#J-start-quiz").on("click",function(){$("#J-intro").addClass("hide"),$("#J-quiz-content").removeClass("hide"),$("#J-quiz-bottombar").removeClass("hide"),a.startCountdonw()})},startCountdonw:function(){var a=$("#J-countdown").attr("data-time");a=a.replace("min","")-0,a=60*a*1e3-1e3;var b=(new Date).valueOf()+a;$("#J-countdown").countdown(b.toString(),function(a){"finish"==a.type&&alert("笔试时间到"),$(this).find(".time").html(a.strftime("%H:%M:%S"))})}};positionDetailExpand();var jdRun={init:function(){var a=this;a.bindHandler()},bindHandler:function(){$(".position-filter-wrapper-jdrun li").on("click",function(){var a=$(this);if(!a.hasClass("position-type-curr")){$(".position-filter-wrapper-jdrun li").removeClass("position-type-curr"),a.addClass("position-type-curr");var b=$(".position-filter-wrapper-jdrun .position-type-bd"),c=a.index();b.find("p").removeClass("curr"),b.find("p").eq(c).addClass("curr")}})}};
(function () {
    var onInfo = false;
    var shareBtn = $('.share li a');
    var shareInfo = $('.share-info')
    shareBtn
        .on('mouseenter', function() {
            shareInfo.removeClass('target')
            $(this).next('.share-info').addClass('target')
        })
        .on('mouseleave', function() {
            // setTimeout(function() {
            //     if (!onInfo)
                    $(this).next('.share-info').removeClass('target');
            // })
        })

    shareInfo
        .on('mouseenter', function() {
            $(this).addClass('target');
            onInfo = true
        })
        .on('mouseleave', function() {
            $(this).removeClass('target');
            onInfo = false
        })
}())