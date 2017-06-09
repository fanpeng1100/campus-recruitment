function userSelect(){var i=$(".J-login-list");i.bind("mouseenter mouseleave",function(){$(this).toggleClass("login-list-target")})}function subNav(){var i,n=$(".J-nav-sub");n.bind("mouseenter",function(){$(this).next("div.J-nav-sub-list").show()}),n.bind("mouseleave",function(){var n=$(this);i=setTimeout(function(){n.next("div.J-nav-sub-list").hide()},100)}),$(".J-nav-sub-list").bind("mouseenter",function(){clearTimeout(i)}),$(".J-nav-sub-list").bind("mouseleave",function(){$(this).hide()})}function positionExpand(){var i=$(".position-detail-desc");i.bind("click",function(){$(this).toggleClass("position-detail-collapsed")})}function groupTabWidth(){var i=$(".position-group-tab-wrapper"),n=i.find("li"),t=n.length,e=$(".position-wrapper").width(),o=20,a=100*o*(t-1)/e/t+"%",s=(e-o*(t-1))/t,r=100*s/e+"%";n.each(function(i){$(this).css({width:r,"margin-right":a}),i===t-1&&$(this).css({"margin-right":0})})}function positionDetailExpand(i){i=i||$("body"),i.find(".position-program-member-item").bind("click","em",function(){var n=$(this).index();i.find(".position-program-member-detail-item").eq(n).fadeIn()}),i.find(".position-program-member-detail-item").bind("click","b",function(){$(this).fadeOut()})}function tabsNav(i,n){function t(i){for(var n=0;n<e.length;n++)n===i?e.filter(".p-"+n).removeClass("hide"):e.filter(".p-"+n).addClass("hide")}var e=$(n),o=$(i+" > .tabs-nav > li");t(2),o.on("click",function(i){var n=$(this);n.hasClass("active")||(t(n.index()),o.removeClass("active"),n.addClass("active"))})}function initToggleCheckbox(){$(".jd-checkbox").on("click",function(){var i=$(this).children(":checkbox");i.attr("checked",!i.attr("checked"))})}userSelect(),subNav(),positionExpand(),groupTabWidth();var quiz={init:function(){var i=this;i.bindHandler()},bindHandler:function(){var i=this;$("#J-start-quiz").on("click",function(){$("#J-intro").addClass("hide"),$("#J-quiz-content").removeClass("hide"),$("#J-quiz-bottombar").removeClass("hide"),i.startCountdonw()})},startCountdonw:function(){var i=$("#J-countdown").attr("data-time");i=i.replace("min","")-0,i=60*i*1e3-1e3;var n=(new Date).valueOf()+i;$("#J-countdown").countdown(n.toString(),function(i){"finish"==i.type&&alert("笔试时间到"),$(this).find(".time").html(i.strftime("%H:%M:%S"))})}},jdRun={init:function(){var i=this;i.bindHandler()},bindHandler:function(){$(".position-filter-wrapper-jdrun li").on("click",function(){var i=$(this);if(!i.hasClass("position-type-curr")){$(".position-filter-wrapper-jdrun li").removeClass("position-type-curr"),i.addClass("position-type-curr");var n=$(".position-filter-wrapper-jdrun .position-type-bd"),t=i.index();n.find("p").removeClass("curr"),n.find("p").eq(t).addClass("curr")}})}};initToggleCheckbox();
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
                // if (!onInfo)
                    $(this).next('.share-info').removeClass('target')
            // })
        })

    shareInfo
        .on('mouseenter', function() {
            $(this).addClass('target')
            onInfo = true
        })
        .on('mouseleave', function() {
            $(this).removeClass('target')
            onInfo = false
        })
}())