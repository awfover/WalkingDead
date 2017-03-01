var dragElement,
	dragTarget,
    dragCount = 0,
    dragMark = 0,
    state = 0,
    backpackViewSize = 0.8,
    isItemDrag = false,
    isMouseDown = false,
    idTimeout = -1,
    mouseEvent = undefined,
    offset = {
    	x: 0,
    	y: 0
    };

$(document).ready(function () {
	offset.x = $(".frame").offset().left;
	offset.y = $(".frame").offset().top;
});

$(window).resize(function () {
	offset.x = $(".frame").offset().left;
	offset.y = $(".frame").offset().top;
});

$(".backpack-view").on("mousewheel", pinch);

function pinch(e, delta) {
	s = backpackViewSize.toString() + "\n";
	backpackViewSize += delta * 0.06;
	s += backpackViewSize.toString() + "\n";
	if (backpackViewSize > 0.9) {
		backpackViewSize = 0.9;
	}
	else if (backpackViewSize <= 0.1) {
		backpackViewSize = 0.1;
	}
	$(this).children().css(Modernizr.prefixed("transform"), "scale(" + backpackViewSize.toString() + ")");
}

$(".backpack-view").click(function (e) {
	$(this).fadeOut();
	$(this).children().fadeOut();
	e.stopPropagation();
});

$(".backpack-view img").click(function () {
	$(".backpack-view").trigger("click");
});

$(".backpack-btn").click(function (event) {
	if (state != 0) {
		return false;
	}
	if ($(this).siblings(".backpack-bar").hasClass("open")) {
		$(this).siblings(".backpack-bar").removeClass("open").addClass("close");
	}
	else {
		$(this).siblings(".backpack-bar").removeClass("close").addClass("open");
	}
	event.stopPropagation();
});

$(".backpack-item").on("vmouseup", ".backpack-img", function (event) {
	var item = $(this).parent();
	if (item.parents(".backpack-wrapper").length > 0) {
		if (item.attr("id") != "item-selected") {
			$("#item-selected").css("border-color", "transparent");
			$("#item-selected").removeAttr("id");
			item.css("border-color", "red");
			item.attr("id", "item-selected");
			$(".backpack-description").text(res[$("#item-selected img").attr("name")].description);
		}
	}
	else if (item.parents(".backpack-mix").length > 0) {
		var items = $(".backpack-wrapper .backpack-item"),
		img = $(this);
		img.attr("draggable", "true");
		img.parent().attr("state", "normal");

		items.eq(getBlank()).append(img);
		dragCount--;

		if (dragCount <= 1) {
			$(".backpack-mixbtn").attr("state", "normal");
		}
	}
	event.stopPropagation();
});

$(".backpack-mixbtn").on("vmouseup", function (e) {
	if ($(this).attr("state") == "active") {
		var items0 = $(".backpack-wrapper .backpack-item"),
			items1 = $(".backpack-mix .backpack-img"),
			pos = getBlank();
		items0.eq(pos).append(res[items1.eq(0).attr("name")].getMix());
		items0.eq(pos).children().on("vmousedown", mouseDown);
		items0.eq(pos).children().on("vmousemove", mouseMove);
		items0.eq(pos).children().on("vmouseup", mouseUp);
		items1.remove();

		var _this = items0.eq(pos).children();
		if(_this.width()>_this.height()){
			_this[0].style.cssText = "width:40px;";
			_this[0].style.cssText = "width:40px;height:"+_this.height()+"px;top:"+((60-_this.height())/2)+"px;left:8px;";
			if(_this.height()<25){
				_this[0].style.cssText = "width:40px;height:"+_this.height()*1.3+"px;top:"+((60-_this.height()*1.3)/2)+"px;left:8px;";
			}
		}
		else{
			_this[0].style.cssText = "height:40px;";
			_this[0].style.cssText = "height:40px;width:"+_this.width()+"px;left:"+((60-_this.width())/2)+"px;top:8px;";
			if(_this.width()<20){
				_this[0].style.cssText = "height:40px;width:"+_this.width()*1.6+"px;left:"+((60-_this.width()*1.6)/2)+"px;top:8px;";
			}
		}

		dragCount = 0;
		$(this).attr("state", "normal")
	}
	event.stopPropagation();
});

$(".tool").on("vmouseup", function (e) {
	if (isViewChanging == 1) {
		return;
	};
	// if ($(this).parent().parent().children().eq(viewNow[roomNow]).attr("class") != $(this).parent().attr("class")) {
	// 	$(this).parent().trigger("click");
	// 	return;
	// }
	if($(this).attr("class")=="room-item-wrench tool"){
		$(this).attr("src",images.Realwrench.src);
	}
    var _this=$(this);
    var w = _this.width();
    var h = _this.height();
	var items = $(".backpack-wrapper .backpack-item");
	$(this).unbind();
	clearSame($(this).attr("class"));
	pickIn($(this));
	setTimeout(function(){
		var pos = getBlank();
		_this.attr({
		"class": "backpack-img",
		});
		res[_this.attr("name")].state = "picked";
		items.eq(pos).append(_this);
		//_this.css({width:"40px",height:"40px",left:"8px",top:"8px"});
		if(w>h){
			h=h*40/w;
			_this[0].style.cssText = "width:40px;";
			_this[0].style.cssText = "width:40px;height:"+h+"px;top:"+((60-h)/2)+"px;left:8px;";
			if(_this.height()<25){
				_this[0].style.cssText = "width:40px;height:"+h*1.3+"px;top:"+((60-h*1.3)/2)+"px;left:8px;";
			}
		}
		else{
			w=w*40/h;
			_this[0].style.cssText = "height:40px;";
			_this[0].style.cssText = "height:40px;width:"+w+"px;left:"+((60-w)/2)+"px;top:8px;";
			if(_this.width()<20){
				_this[0].style.cssText = "height:40px;width:"+w*1.6+"px;left:"+((60-w*1.6)/2)+"px;top:8px;";
			}
		}
		_this.removeAttr("id");
		items.eq(pos).children().on("vmousedown", mouseDown);
		items.eq(pos).children().on("vmousemove", mouseMove);
		items.eq(pos).children().on("vmouseup", mouseUp);
		e.stopPropagation();
	},1700);
});

$("*").on("vmousedown", mouseDown);
$("*").on("vmousemove", mouseMove);
$("*").on("vmouseup", mouseUp);

$("*").on("dragstart", function (e) {
	e.preventDefault();
	return false;
});

$("*").on("taphold", function (e) {
	e.preventDefault();
	return false;
});

function backpackViewShow(src) {
	var item = $(".backpack-view")
	backpackViewSize = 0.8;
	item.children().attr("src", src).css(Modernizr.prefixed("transform"), "scale(0.8)");
	//item.fadeIn();
	item.show();
	item.children().fadeIn();
}

function getBlank() {
	var items = $(".backpack-wrapper .backpack-item"),
		i = -1;
	while (items.eq(++i).find(".backpack-img").length > 0);
	return i;
}

function itemMix() {
	var items = $(".backpack-wrapper .backpack-item"),
		img = $(".backpack-item.item-0").find(".backpack-img").eq(0);
	img.attr("draggable", "true");

	items.eq(getBlank()).append(_this);
	dragIndex = 0;

	$(".backpack-item.item-1").empty();
}

function ptInRect(e, rc, dev) {
	return ((e.pageX > rc.offset().left - dev) && (e.pageX < rc.offset().left + rc.width() + dev) &&
			(e.pageY > rc.offset().top - dev) && (e.pageY < rc.offset().top + rc.height() + dev))
}

function dragCheck(e, dev) {//判断目前位置是否是container物品或者是背包混合栏。
	var i;
	dev = dev || 5;
	for (var x = 0; x < $(".container").length; x++) {
		i =  $(".container").eq(x);
		if (ptInRect(e, i, dev)) {//如果两个物体在一定距离之内，则dragTarget 为该物体.
			dragTarget = i;
			return true;
		}
	}
	for (var x = 0; x < $(".backpack-mix .backpack-item").length; x++) {
		i =  $(".backpack-mix .backpack-item").eq(x);
		if ((i.children().length == 0) && ptInRect(e, i, dev)) {
			dragTarget = i;
			return true;
		}
	}

	if (ptInRect(e, $("[name='magnifier']"), dev)) {
		dragTarget = $("[name='magnifier']");
		return true;
	}

	dragTarget = undefined;
	return false;
}

function itemDrop() {
	if (dragTarget.attr("class") == "backpack-item") {//如果目标是合成物品栏
		dragTarget.append(dragElement);
		dragTarget.attr("state", "active");

		dragCount++;//拉一个物品，这个加1，到两个的时候，可以合成
		if (dragCount == 2) {
			var items = $(".backpack-mix .backpack-img");
			if (res[items.eq(0).attr("name")].value == res[items.eq(1).attr("name")].value) {
				$(".backpack-mixbtn").attr("state", "active");
			}
			else {
				$(".backpack-mixbtn").attr("state", "disabled");
			}
		}
	}
	else if (dragTarget.attr("name") == "magnifier"&&dragElement.attr("name")=="note") {
		backpackViewShow(images.bignote.src);
	}
	else if (dragTarget.attr("name") == "magnifier"&&dragElement.attr("name")=="poster") {
		backpackViewShow(images.poster.src);
	}
	else {
		if (res[$(dragTarget).attr("name")].value == res[dragElement.attr("name")].value * 1000) {
			res[$(dragTarget).attr("name")].open(res);
			dragElement.remove();
		}
	}
}

function mouseDown(e) {
	isMouseDown = true;
	mouseEvent = e;
	idTimeout = -1;

	var _this = this;
	if (($(this).attr("class") == "backpack-img")) {
		_this = this.parentNode;
	}
	if (($(_this).parents(".backpack-wrapper").length > 0) && ($(_this).attr("class") == "backpack-item") && (_this.children.length == 1)) {
		idTimeout = setTimeout(function () {
			if (ptInRect(mouseEvent, $(_this), 0)) {
				//$("#debug").text($(_this).attr("src"));
				_this = _this.children[0];
				isItemDrag = true;
				dragElement = $(_this);
				dragTarget = undefined;
				$(".backpack-drag").attr("src", $(_this).attr("src")).css({
					"left": (Number(e.pageX) - 40 - offset.x).toString() + "px",
					"top": (Number(e.pageY) - 40).toString() + "px",
					"cursor": "none",
				});
				$(".backpack-drag").css(Modernizr.prefixed("transform"), "scale(1)");
			}
		}, 150);
	}
	if ($(this).parents(".backpack-wrapper").length > 0) {
		e.preventDefault();
		return false;
	}
	e.stopPropagation();
}

function mouseMove(e) {//用于不断判断位置，来绘制拖拽物品
	mouseEvent = e;
	if (isItemDrag) {
		$(".backpack-drag").css({
			"left": (Number(e.pageX) - 40 - offset.x).toString() + "px",
			"top": (Number(e.pageY) - 40 - offset.y).toString() + "px",
		});

		if (!ptInRect(e, $(".backpack-bar"), 0)) {
			if ($(".backpack-bar").css("opacity") != "0") {
				$(".backpack-bar").css("opacity", "0");
			}
		}
		else if ($(".backpack-bar").css("opacity") == "0") {
			$(".backpack-bar").css("opacity", "1");
		}

		if (dragCheck(e)) {//判断目标是否是可交互物体
			$(".backpack-drag").css("opacity", "1");
			$(".backpack-drag").css(Modernizr.prefixed("transform"), "scale(1.5)");
		}
		else {
			$(".backpack-drag").css("opacity", "0.5");
			$(".backpack-drag").css(Modernizr.prefixed("transform"), "scale(1)");
		}
	}
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function mouseUp(e) {
	isMouseDown = false;
	mouseEvent = e;

	if (idTimeout != -1) {
		clearTimeout(idTimeout);
	}

	if (($("#item-selected").length > 0) && !ptInRect(e, $("#item-selected"), 0)) {
		$("#item-selected").css("border-color", "transparent");
		$("#item-selected").removeAttr("id");
	}

	if (isItemDrag) {//如果正在拖拉，则松开鼠标之后，拖拉事件结束。
		isItemDrag = false;
		$(".backpack-drag").css(Modernizr.prefixed("transform"), "scale(0)");
		$(".backpack-drag").css({
			"cursor": "default",
			"opacity": "0.5",
		});
		$(".backpack-bar").css("opacity", "1");

		if (ptInRect(e, $(dragElement).parent(), 0)) {
			var item = $(dragElement).parent();
			$("#item-selected").css("border-color", "transparent");
			$("#item-selected").removeAttr("id");
			if ($(dragElement).parents(".backpack-wrapper").length > 0) {
				item.css("border-color", "red");
				item.attr("id", "item-selected");
			}
			$(".backpack-description").text(res[$("#item-selected img").attr("name")].description);
		}
		if (dragTarget != undefined) {
			itemDrop();
		}
	}

	if ($(this).attr("name") != undefined) {
	//if (($(this).attr("name") != undefined) && (res[$(this).attr("name")].state == "default")) {
		$(".backpack-description").text(res[$(this).attr("name")].description);
	}
	if (($(this).parents(".backpack-mix").length > 0) && ($(this).attr("class") == "backpack-item") && ($(this).children().length == 0)) {
		$(".backpack-description").text("将你准备合成的物品拖拽方框内。");
	}
}
//拉绳点击事件
$("#dragline").on("vmouseup",function(e){
	if($("#lighter").css("display")=="none"){
		$("#lighter").css("display","block");
	}
	else {
		$("#lighter").css("display","none");
	}
})
//保险箱点击事件
$("#safe").on("vmouseup",function(e){
	if($(".safebox").css("display")=="none"){
		$(".safebox").css("display","block");
		setTimeout(function(){
			$(".safebox").css("transform", "scale(1)");
		},10);
		return;
	}
	else{
		$(".safebox").css("transform", "scale(0.01)");
		setTimeout(function(){
			$(".safebox").css("display","none");
		},500);
		return;
	}
})
//保险箱数字输入
$(".safe_btn").on("click",function(e){
	var num=$(this).attr("class")[9];
	if($("#safe_screen").text().length<4){
		$("#safe_screen").text($("#safe_screen").text()+num);
		if($("#safe_screen").text().length==4){
		    setTimeout(function(){
		    	if($("#safe_screen").text()=="1213"){
                	$("#safe").trigger("vmouseup");
                	res.safe.description = "你在里面发现了铁锤和手枪。";
                	SafeBox_show();
                }
                else {
                	$("#safe_screen").text("密码错误！");
                	setTimeout(function(){
                       $("#safe_screen").text("");
                	}, 1000);
                }
		    },500);
		}
	}

})
//清除不同视角的同一个物体

function clearSame(classname){
 if(classname=="room-item-note tool"){
  	$("#note_1").css("display","none");
  	return;
  }
  else if(classname=="room-item-note_1 tool"){
  	$("#note").css("display","none");
  	return;
  }
  if(classname=="room-item-key2 tool"){
  	$("#key2_1").css("display","none");
  	return;
  }
   else if(classname=="room-item-key2_1 tool"){
  	$("#key2").css("display","none");
  	return;
  }
}
//获取物品动画
function pickIn(obj){
	obj.css("z-index","1000");
	var w=obj.width();
	var h=obj.height()
	obj.animate({left:(400-w)+"px",top:(300-h)+"px",width:(w*2)+"px",height:(h*2)+"px"},800);
	obj.animate({left:"44px",top:"35px",width:(0.01*w)+"px",height:(0.01*h)+"px"},800);
}
//打开保险箱
function SafeBox_show(){
	$("#safe").css("display","none");
	$("#safe_open").css("display","block");
	$("#gun").css("display","block");
	$("#hammer").css("display","block");
}
//room3 view1 柜子点击打开
$("#cabinet31").on("click",function(){
	res[$(this).attr("name")]["state"] = "open";
	res[$(this).attr("name")].open();
})
//room3 view2 保险箱点击打开
$("#safe31").on("vmouseup",function(e){
	var safebox = $(this).parent().find(".safebox");
	if(safebox.css("display")=="none"){
		safebox.css("display","block");
		setTimeout(function(){
			safebox.css("transform", "scale(1)");
		},10);
		return;
	}
	else{
		safebox.css("transform", "scale(0.01)");
		setTimeout(function(){
			safebox.css("display","none");
		},500);
		return;
	}
})

$("#dragline31").on("vmouseup",function(e){
	if (res["lamptop31_open"].state == "disabled") {
		return;
	}
	if ($("#lamptop31_open").css("opacity") == "0") {
		$("#lampshade31").css("transform", "rotate(-90deg)");
		$("#lamptop31_open").css({
			"transform": "scale(1)",
			"opacity": "1"
		}, "fast");
	}
	else {
		$("#lampshade31").css("transform", "rotate(0deg)");
		$("#lamptop31_open").css({
			"transform": "scale(0.01)",
			"opacity": "0"
		}, "fast");
	}
})
$("#wall_break31").on("click",function(){
	res[$(this).attr("name")]["state"] = "open";
	res[$(this).attr("name")].open();
})


$(".safebox31 .safe_btn").on("click",function(e){
	var num=$(this).attr("class")[9];
	var safe_screen = $(this).parent().find("#safe_screen");
	if (safe_screen.text().length == 0) {
		$("#safe_encryption").hide();
		clearInterval(encryptionInterval);
	}
	if(safe_screen.text().length<4){
		$(this).parent().find("#safe_screen").text($(this).parent().find("#safe_screen").text()+num);
		console.log($(this).parent().find("#safe_screen").text());
		if(safe_screen.text().length==4){
			console.log("四位了");
		    setTimeout(function(){
		    	if(safe_screen.text()=="8439"){
                	//获得物品
					console.log("获得物品");
					$("#safe31_open,#key32").show();
					$(".safebox").css("transform", "scale(0.01)");
					res.safe31.description = "你在里面发现了一把钥匙。";
					setTimeout(function(){
						$(".safebox").css("display","none");
					},500);
                }
                else {
					console.log("密码错误");
                	safe_screen.text("密码错误！");
                	setTimeout(function(){
                       safe_screen.text("");
                       $("#safe_encryption").show();
                       encryptionInterval = setInterval(showEncryption, 1000);
                	}, 1000);
                }
		    },500);
		}
	}
});

//room3 view2 结束
