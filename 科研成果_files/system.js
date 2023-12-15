//作者：懒人建站 http://www.51xuediannao.com 
$(document).ready(function(){
	//alert($(".xzjy").height());
	var navspan = $("#nav a span");
	navspan.hover(
	  function () {
		$(this).addClass("spanhover");
	  },
	  function () {
		$(this).removeClass("spanhover");
	  }
	);
	//顶部导航菜单
	var main_nav_a = $("#main_nav a");
	var sub_nav = "#sub_nav li";
	var nav = $("#nav");
	var thisindex = main_nav_a.index($('.thisnav'));
	$(sub_nav).eq(thisindex).siblings(sub_nav).hide().end().show();
	//alert(index_); 
 	main_nav_a.mouseover(function(){
		//$(this).siblings().removeClass("navthis").end().addClass("navthis");
		var newindex = main_nav_a.index($(this));
		$(sub_nav).eq(newindex).siblings(sub_nav).hide().end().show(); 
		//alert(newindex);
  	});
	nav.mouseleave(function(){
		$(sub_nav).eq(thisindex).siblings(sub_nav).hide().end().show();
  	});
	//$(sub_nav).eq(5).show();
	
	//div模拟跳转菜单
	var divjump = $("#divjump");
	var jumpmenu = $("#divjump li.jumpmenu");
	var jumpmenuclick = $("#divjump li.jumpmenu span");
	var jumpmenulist = jumpmenuclick.next();
	jumpmenuclick.click(function(){
		var jumpmenulistthis = $(this).next("div.jumpmenulist");
	    if(jumpmenulistthis.css("display")=="none"){
			jumpmenulist.slideUp();
			jumpmenulistthis.slideDown();
			$(this).addClass("jumpmenuthis");
		  }else{
			jumpmenulist.slideUp();
		 }
	});
	
	jumpmenu.mouseleave(function(){
	  jumpmenulist.slideUp();
	  jumpmenuclick.removeClass("jumpmenuthis");
	});
	//menulist
	var menulist = $("#menulist");
	var menulistli = $("#menulist li");
	var menuone = $("#menulist a.menuone");
	var submenu = $("#menulist div");
	menulist.find("div").eq(0).show();
	menulistli.click( function () {
	$(this).addClass("menuthis").children("div.submenu").show().end().siblings().removeClass("menuthis").children("div.submenu").hide(); 
});
	//sl
	jQuery.focus = function(slid) {
		var sWidth = $(slid).width(); //获取焦点图的宽度（显示面积）
		var sHeight = $(slid).height(); //获取焦点图的高度（显示面积）
		var len = $(slid).find("ul li").length; //获取焦点图个数
		var index = 0;
		var picTimer;
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		var btn = "<div class='btnBg'></div><div class='btn'>";
		for(var i=0; i < len; i++) {
			var ii = i+1;
			btn += "<span>"+ii+"</span>";
		}
		btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
		$(slid).append(btn);
		$(slid).find("div.btnBg").css("opacity",0.5);
	
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		$(slid+" div.btn span").css("opacity",0.4).mouseenter(function() {
			index = $(slid+" .btn span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseenter");
	
		//上一页、下一页按钮透明度处理
		$(slid+" .preNext").css("opacity",0.2).hover(function() {
			$(this).stop(true,false).animate({"opacity":"0.5"},300);
		},function() {
			$(this).stop(true,false).animate({"opacity":"0.2"},300);
		});
	
		//上一页按钮
		$(slid+" .pre").click(function() {
			index -= 1;
			if(index == -1) {index = len - 1;}
			showPics(index);
		});
	
		//下一页按钮
		$(slid+" .next").click(function() {
			index += 1;
			if(index == len) {index = 0;}
			showPics(index);
		});
	
		//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
		$(slid+" ul").css("width",sWidth * (len));
		//$(slid+" ul").css("height",sHeight * (len));
		
		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$(slid).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},4000); //此4000代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
		
		//显示图片函数，根据接收的index值显示相应的内容
		function showPics(index) { //普通切换
			var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
			var nowTop = -index*sHeight; //根据index值计算ul元素的top值
			$(slid+" ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
			//$(slid+" ul").stop(true,false).animate({slfx:nowTop},300); //通过animate()调整ul元素滚动到计算出的posit
			$(slid+" .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
			$(slid+" .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		}
	
	};
	$.focus("#banner");
	
});
$(window).load(function () {
	var resizeimg =$("div.txt_p img");
	resizeimg.aeImageResize({height:610,width:610 });
});
//等比缩放
/*var thisimg =$("div.txt_p img");
thisimg.aeImageResize({height:660,width:660 });*/
(function(d){d.fn.aeImageResize=function(a){var i=0,j=d.browser.msie&&6==~~d.browser.version;if(!a.height&&!a.width)return this;if(a.height&&a.width)i=a.width/a.height;return this.one("load",function(){this.removeAttribute("height");this.removeAttribute("width");this.style.height=this.style.width="";var e=this.height,f=this.width,g=f/e,b=a.height,c=a.width,h=i;h||(h=b?g+1:g-1);if(b&&e>b||c&&f>c){if(g>h)b=~~(e/f*c);else c=~~(f/e*b);this.height=b;this.width=c}}).each(function(){if(this.complete||j)d(this).trigger("load")})}})(jQuery);
/*idTabs*/
(function(){var dep={"jQuery":"http://code.jquery.com/jquery-latest.min.js"};var init=function(){(function($){$.fn.idTabs=function(){var s={};for(var i=0;i<arguments.length;++i){var a=arguments[i];switch(a.constructor){case Object:$.extend(s,a);break;case Boolean:s.change=a;break;case Number:s.start=a;break;case Function:s.click=a;break;case String:if(a.charAt(0)=='.')s.selected=a;else if(a.charAt(0)=='!')s.event=a;else s.start=a;break;}}
if(typeof s['return']=="function")
s.change=s['return'];return this.each(function(){$.idTabs(this,s);});}
$.idTabs=function(tabs,options){var meta=($.metadata)?$(tabs).metadata():{};var s=$.extend({},$.idTabs.settings,meta,options);if(s.selected.charAt(0)=='.')s.selected=s.selected.substr(1);if(s.event.charAt(0)=='!')s.event=s.event.substr(1);if(s.start==null)s.start=-1;var showId=function(){if($(this).is('.'+s.selected))
return s.change;var id="#"+this.name.split('#')[1];var aList=[];var idList=[];$("a",tabs).each(function(){if(this.name.match(/#/)){aList.push(this);idList.push("#"+this.name.split('#')[1]);}});if(s.click&&!s.click.apply(this,[id,idList,tabs,s]))return s.change;for(i in aList)$(aList[i]).removeClass(s.selected);for(i in idList)$(idList[i]).hide();$(this).addClass(s.selected);$(id).show();return s.change;}
var list=$("a[name*='#']",tabs).unbind(s.event,showId).bind(s.event,showId);list.each(function(){$("#"+this.name.split('#')[1]).hide();});var test=false;if((test=list.filter('.'+s.selected)).length);else if(typeof s.start=="number"&&(test=list.eq(s.start)).length);else if(typeof s.start=="string"&&(test=list.filter("[name*='#"+s.start+"']")).length);if(test){test.removeClass(s.selected);test.trigger(s.event);}
return s;}
$.idTabs.settings={start:0,change:false,click:null,selected:".selected",event:"!click"};$.idTabs.version="2.2";$(function(){$(".idTabs").idTabs();});})(jQuery);}
var check=function(o,s){s=s.split('.');while(o&&s.length)o=o[s.shift()];return o;}
var head=document.getElementsByTagName("head")[0];var add=function(url){var s=document.createElement("script");s.type="text/javascript";s.src=url;head.appendChild(s);}
var s=document.getElementsByTagName('script');var src=s[s.length-1].src;var ok=true;for(d in dep){if(check(this,d))continue;ok=false;add(dep[d]);}if(ok)return init();add(src);})();
//加入收藏夹
    function addCookie() {
        if (document.all) {
            window.external.addFavorite(document.location.href,document.title);
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(document.title,document.location.href,"")
        }
    }