var isViewChanging = 0,
	roomNow = 0,
	viewNow = [0, 0, 0,0],
	viewRotateAngle = [0, 0, 0];

$(".view-prev").click(function(event) {//视角切换
	var room = $(".room").children().eq(roomNow),
		now = room.children().eq(viewNow[roomNow]);
	viewNow[roomNow] = (viewNow[roomNow] + 3) % 4;
	var	next = room.children().eq(viewNow[roomNow]);
	now.fadeOut();
	next.fadeIn();
	event.stopPropagation();
});

$(".view-next").click(function(event) {
	var room = $(".room").children().eq(roomNow),
		now = room.children().eq(viewNow[roomNow]);
	viewNow[roomNow] = (viewNow[roomNow] + 1) % 4;
	var	next = room.children().eq(viewNow[roomNow]);
	now.fadeOut();
	next.fadeIn();
	event.stopPropagation();
});

// $(".view-0").on("click", 0, viewChange);
// $(".view-1").on("click", 1, viewChange);
// $(".view-2").on("click", 2, viewChange);
// $(".view-3").on("click", 3, viewChange);

$(".room-item-safe").click(function(event) {//保险箱
	if ($(".room-item-safe").css("width") == "128px")
	{
		$(".room-item-safe").css({
			"background-size": "256px 256px",
			"height": "256px",
			"width": "256px"
		});
		$(".safe-key").css("width", "172px");
		$(".safe-key-num").css({
			"width": "40px",
			"height": "40px",
			"line-height": "40px",
			"margin-right": "4px",
			"font-size": "24px"
		});
		$(".safe-key-num").eq(3).css("margin", "0");
	}
	else
	{
		$(".room-item-safe").css({
			"background-size": "128px 128px",
			"height": "128px",
			"width": "128px"
		});
		$(".safe-key").css("width", "86px");
		$(".safe-key-num").css({
			"width": "20px",
			"height": "20px",
			"line-height": "20px",
			"margin-right": "2px",
			"font-size": "14px"
		});
		$(".safe-key-num").eq(3).css("margin", "0");
	}
	event.stopPropagation();
});

$(".safe-key-num").click(function(event) {
	if ($(this).css("width") != "20px")
	{
		if (res["safe"].state == "default") {
			$(this).text(((parseInt($(this).text()) + 1) % 10).toString());
			if ($(".safe-key-num").text() == "1211") {
				$(".room-item-gun").show();
				$(".room-item-hammer").show();
				$(".backpack-description").text("哟哟，你很幸运，里面有两件物品。")
				res["safe"].state = "open";
			}
		}
		event.stopPropagation();
	}
	else
	{
		$(".backpack-description").text(res["safe"].value);
		$(".room-item-safe").css({
			"background-size": "256px 256px",
			"height": "256px",
			"width": "256px"
		});
		$(".safe-key").css("width", "172px");
		$(".safe-key-num").css({
			"width": "40px",
			"height": "40px",
			"line-height": "40px",
			"margin-right": "4px",
			"font-size": "24px"
		});
		$(".safe-key-num").eq(3).css("margin", "0");
	}
});

$(".room-item-door3").click(function (e) {
	$(".room-0").fadeOut();
	$(".room-1").fadeIn();
	$("#viewprev").hide();
	$("#viewnext").hide();
	roomNow = 1;
	e.stopPropagation();
})
$("#viewback").click(function(e){
	$(".room-0").fadeIn();
	$(".room-1").fadeOut();
	$("#viewprev").fadeIn();
	$("#viewnext").fadeIn();
	roomNow = 0;
	e.stopPropagation();
})

function viewClick(e) {
	if (isViewChanging == 0) {
		if (e.data == ((viewNow[roomNow] + 1) % 4)) {
			//viewChange(1, $(this));
		}
	}
}

function viewChange(e) {
	if ((isViewChanging == 1) || (e.data == viewNow[roomNow])) {
		return;
	}

	var orientation = -1;
	if (e.data == ((viewNow[roomNow] + 1) % 4)) {
		orientation = 1;
	}

	var traEndEventNames = {
			'WebkitAnimation' : 'webkitTransitionEnd',
			'OAnimation' : 'oTransitionEnd',
			'msAnimation' : 'MSTransitionEnd',
			'animation' : 'transitionend'
		},
		traEndEventName = traEndEventNames[Modernizr.prefixed("animation")],
		// support css animations
		support = Modernizr.cssanimations,
		styles = [
			"translate3d(0, 0, 0) rotateY(",
			"translate3d(-400px, 0, 400px) rotateY(",
			"translate3d(0, 0, 800px) rotateY(",
			"translate3d(400px, 0, 400px) rotateY("
		];
	
	isViewChanging = 1;
	viewRotateAngle[roomNow] += (orientation * 90);
	viewNow[roomNow]= (viewNow[roomNow] + orientation + 4) % 4;
	var style = styles[viewNow[roomNow]] + viewRotateAngle[roomNow].toString() + "deg)";
	$(".room").children().eq(roomNow).css(Modernizr.prefixed("transform"), style).one(traEndEventName, function () {
		isViewChanging = 0;
	});
}
