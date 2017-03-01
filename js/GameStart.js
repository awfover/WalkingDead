var step = 0;
var ctx = document.getElementById('canvas').getContext('2d');
var images=[];
var process=190;
var inCla = [];
var outCla = [];
var slideTimeout = null;
var encryption = ["&(#+", "&$=!", "=)-*", "@%β☺"];
var encryptionIndex = 0;
var encryptionInterval = 0;
var sources={
	   bullet:"./image/bullet.png",
     healthImage:"./image/life.png",
     normalImage:"./image/walkers.png",
     attackImage:"./image/walkers-attack.png",
     hitImage:"./image/walkers-hit.png",
     shout:"image/shout.png",
     backpic:"./image/background.jpg",
     hurtImage:"./image/hit-back.png",
     key1:"./image/key1.png",
     key31:"./image/key31.png",
     key32:"./image/key32.png",
     key33:"./image/key33.png",
     wrench:"./image/wrench.fw.png",
     Realwrench:"./image/wrench.png",
     note:"./image/note.png",
     drawer:"./image/drawer_closed.png",
     key2:"./image/key2.png",
     key3:"./image/key3.png",
     gun:"./image/gun.png",
     hammer:"./image/hammer.png",
     door1:"./image/door1.png",
     door3:"./image/door3.png",
     viewprev:"./image/prev.png",
     viewnext:"./image/next.png",
     view00:"./image/view0.0.png",
     view01:"./image/view0.1.fw.png",
     note_1:"./image/view1_paper.fw.png",
     bignote:"./image/Bignote.fw.png",
     drawer_1:"./image/view1_drawer.fw.png",
     drawer_1_open:"./image/open_drawer.fw.png",
     dragLine:"./image/view1_drag.fw.png",
     Lighter:"./image/view1_light.fw.png",
     door1_1:"./image/view1_door1.fw.png",
     door2:"./image/view1_door2.fw.png",
     Magnifier:"./image/view1_scale.fw.png",
     SafeBox:"./image/safe.png",
     SafeBoxOpen:"./image/safe_open.fw.png",
     BigSafeBox:"./image/view1_bigsafe.fw.png",
     view02:"./image/view3.jpg",
     door2_2:"./image/view2_door2.fw.png",
     door3:"./image/view2_door3.png",
     chair:"./image/view2_chair.fw.png",
     view03:"./image/view4.jpg",
     door3_3:"./image/view3_door3.fw.png",
     view10:"./image/wc.fw.png",
     clothshorse:"./image/clotheshorse.fw.png",
     occlusion:"./image/wchide.fw.png",
     box:"./image/box.png",
     boxopen:"./image/open-box.png",
     viewback:"./image/back.png",
     view30:"./image/view3.0.fw.png",
     view31:"./image/view3.1.fw.png",
     view32:"./image/view3.2.fw.png",
     view33:"./image/view3.3.fw.png",
     scissior:"./image/scissior.png",
     lock301:"./image/lock1.png",
     lock302:"./image/lock2.png",
     lock303:"./image/lock3.png",
     door301:"./image/door301.png",
     door311:"./image/door311.png",
     lock311:"./image/lock1.png",
     lock312:"./image/lock2.png",
     lock313:"./image/lock3.png",
     cabinet31:"./image/cabinet31.png",
     cabinet31_open:"./image/cabinet31_open.png",
     break31:"./image/break.png",
     safe31:"./image/safe31.png",
     safe31_large: "./image/safe31_large.png",
     safe31_open:"./image/safe31_open.png",
     hammer31:"./image/hammer_.png",
     dragline31:"./image/view1_drag.fw.png",
     lampshade31:"./image/lampshade.png",
     lamptop31_open:"./image/lamptop_open.png",
     wall_break31:"./image/wall_break.png",
     backpackBtn:"./image/backpack.png",
     drawerClosed:"./image/drawer_closed.png",
     drawerOpen:"./image/drawer_open.png",
     drawer01:"./image/drawer01.png",
     drawer01_open:"./image/drawer01_open.png",
     poster:"./image/poster.png",
     cudgel:"./image/cudgel.png",
     hit1:"./image/hit1.png",
     hit2:"./image/hit2.png",
     hit3:"./image/hit3.png",
     hit4:"./image/hit4.png",
     hit5:"./image/hit5.png",
     hit6:"./image/hit6.png",
 /*    main_logo:"./image/main_logo.png",*/
     main_start:"./image/main_start.png",
     main_help:"./image/main_help.png",
     main_again:"./image/main_again.png",
     main_restart:"./image/main_restart.png",
     main_next:"./image/main_next.png",
     main_help_detail:"./image/main_help_detail.png",
     poster_s:"./image/poster_s.png",
};


function loadImages(sources,callback){//图片加载
    var loadedImages = 0;
   drawprocess();
   var numImages =0;
   for (var src in sources) {
        numImages++;
   }
   for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function(){
          process=parseInt(190-190*(loadedImages+1)/numImages);
          if (++loadedImages >= numImages) {
              callback();
          }
        };
        images[src].src = sources[src];
      }
}


function Loading(){
    var width = $(window).width();
    var height = $(window).height();
    if (width < height) {
        window.densityDpi = 800 / width;
        adaptScreen(800);
    }
    else {
        window.densityDpi = width * 600 / height / height;
        adaptScreen(width * 600 / height);
    }

  var bkg = new Image();
  bkg.src = "./image/background.super.png";
  bkg.onload = function () {
    $(document.body).show();
    menuChange("loading");
    describe("Loadingtext");
    var cla = animateClass.split(";");
    for (var i = 0; i < cla.length; i++) {
      if (cla[i].indexOf("In") >= 0) {
        inCla.push(cla[i]);
      }
      else if (cla[i].length > 0) {
        outCla.push(cla[i]);
      }
    }
    loadImages(sources,HaveLoad);
  }

  encryptionInterval = setInterval(showEncryption, 1000);
}

function describe(text) {
  var loadtext = window[text].split("/");
  for (var i = 0; i < loadtext.length; i++) {
    if (loadtext[i].length > 0) {
      var text_p = document.createElement("p");
      text_p.setAttribute("class", "containt animated");
      text_p.innerHTML = loadtext[i];
      text_p.style.display = "none";
      $(".main_p").append(text_p);
    }
  }

  slideTimeout = setTimeout(function () {
    slideContaint(0, 0);
  }, 1000);
}

function slideContaint(x, mode) {
  if (!mode) {
    var next = $(".main_p").children().eq(x);
    var animCla = inCla[parseInt(Math.random() * inCla.length)];
    next.show();
    next.addClass(animCla);

    setTimeout(function () {
      next.removeClass(animCla);
      slideContaint(x, 1);
    }, 2000);
  }
  else {
    var prev = $(".main_p").children().eq(x);
    var animCla = outCla[parseInt(Math.random() * outCla.length)];
    prev.addClass(animCla);

    if ($(".main_p").children().length == x + 1) {
      x = -1;
    }

    var animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
    };
    var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
    prev.one(animEndEventName, function () {
      prev.hide();
      prev.removeClass(animCla);
      slideContaint(x + 1, 0);
    });
  }
}

function HaveLoad(){
  $("#backpackBtn").attr("src", images.backpackBtn.src);
  $("#key1").attr("src",images.key1.src);
  $("#wrench").attr("src",images.wrench.src);
  $("#note").attr("src",images.note.src);
  $("#drawer").attr("src",images.drawer.src);
  $("#drawer01").attr("src",images.drawer01.src);
  $("#key2").attr("src",images.key2.src);
  $("#gun").attr("src",images.gun.src);
  $("#hammer").attr("src",images.hammer.src);
  $("#door1").attr("src",images.door1.src);
  $("#door2").attr("src",images.door2.src);
  $("#door3").attr("src",images.door3.src);
  $("#viewprev").attr("src",images.viewprev.src);
  $("#viewnext").attr("src",images.viewnext.src);
  $("#view00").attr("src",images.view00.src);
  $("#drawer").attr("src",images.drawerClosed.src);
  $(".load").css("margin-left","99999px");
  $("#view01").attr("src",images.view01.src);
  $("#note_1").attr("src",images.note_1.src);
  $("#drawer_1").attr("src",images.drawer_1.src);
  $("#key2_1").attr("src",images.key2.src);
  $("#door1_1").attr("src",images.door1_1.src);
  $("#dragline").attr("src",images.dragLine.src);
  $("#lighter").attr("src",images.Lighter.src);
  $("#Magnifier").attr("src",images.Magnifier.src);
  $("#safe").attr("src",images.SafeBox.src);
  $("#safe_open").attr("src",images.SafeBoxOpen.src);
  $("#bigsafe").attr("src",images.BigSafeBox.src);
  $("#door2").attr("src",images.door2.src);
  $("#view02").attr("src",images.view02.src);
  $("#door2_2").attr("src",images. door2_2.src);
  $("#door3").attr("src",images.door3.src);
  $("#chair").attr("src",images.chair.src);
  $("#view03").attr("src",images.view03.src);
  $("#door3_3").attr("src",images.door3_3.src);
  $("#view10").attr("src",images.view10.src);
  $("#clothshorse").attr("src",images.clothshorse.src);
  $("#occlusion").attr("src",images.occlusion.src);
  $("#box").attr("src",images.box.src);
  $("#viewback").attr("src",images.viewback.src);
  $("#view30").attr("src",images.view30.src);
  $("#view31").attr("src",images.view31.src);
  $("#view32").attr("src",images.view32.src);
  $("#view33").attr("src",images.view33.src);
  $("#scissior").attr("src",images.scissior.src);
  $("#key31").attr("src",images.key31.src);
  $("#lock301").attr("src",images.lock301.src);
  $("#lock302").attr("src",images.lock302.src);
  $("#lock303").attr("src",images.lock303.src);
  $("#door301").attr("src",images.door301.src);
  $("#door311").attr("src",images.door311.src);
  $("#lock311").attr("src",images.lock311.src);
  $("#lock312").attr("src",images.lock312.src);
  $("#lock313").attr("src",images.lock313.src);
  $("#cabinet31").attr("src",images.cabinet31.src);
  $("#cabinet31_open").attr("src",images.cabinet31_open.src);
  $("#key33").attr("src",images.key33.src);
  $("#break31").attr("src",images.break31.src);
  $("#safe31").attr("src",images.safe31.src);
  //$("#bigsafe31").attr("src",images.safe31.src);
  $("#bigsafe31").attr("src",images.safe31_large.src);
  $("#safe31_open").attr("src",images.safe31_open.src);
  $("#key32").attr("src",images.key32.src);
  $("#hammer31").attr("src",images.hammer31.src);
  $("#dragline31").attr("src",images.dragline31.src);
  $("#lampshade31").attr("src",images.lampshade31.src);
  $("#lamptop31_open").attr("src",images.lamptop31_open.src);
  $("#wall_break31").attr("src",images.wall_break31.src);
 /* $("#main_logo").attr("src", images.main_logo.src);*/
  $("#main_start").attr("src", images.main_start.src);
  $("#main_help").attr("src", images.main_help.src);
  $("#main_again").attr("src", images.main_again.src);
  $("#main_restart").attr("src", images.main_restart.src);
  $("#main_next").attr("src", images.main_next.src);
  $("#main_help_detail").attr("src", images.main_help_detail.src);
  $("#poster").attr("src", images.poster_s.src);


  setTimeout(function () {
    menuChange("normal");
  }, 1);
}
$("#main_start").on("click",function(){
    $(document).trigger("orientationchange");
  $(".menu_main").removeAttr("value");
  clearTimeout(slideTimeout);
  $(".main_p").empty();
  setTimeout(function () {
    $(".frame").css("display","block");
    offset.x = $(".frame").offset().left;
    offset.y = $(".frame").offset().top;
    $("#load").hide();
    $(".backpack-bar").fadeIn();
    $(".view-prev").fadeIn();
    $(".view-next").fadeIn();
  }, 700);
})
$("#main_help").on("click",function(){
  $(".menu_main").attr("before", $(".menu_main").attr("value"));
  menuChange("help");
})
$("#main_again").on("click", function() {
  location.reload();
});
$("#main_next").on("click", function () {
  $(".menu_main").removeAttr("value");
  clearTimeout(slideTimeout);
  $(".main_p").empty();
  setTimeout(function () {
    $(".frame").fadeIn();
    $("#load").hide();
  }, 700);
});
$(".back").on("click",function(){
  menuChange($(".menu_main").attr("before"));
});

function menuChange(value) {
  var main = $(".menu_main");
  var nodes = main.children();
  var last;

  $(".frame").hide();
  $("#load").fadeIn();
  main.show();

  for (var i = 0; i < nodes.length; i++) {
    if (nodes.eq(i).css("top").replace(/px/, "") >= 266) {
      last = nodes.eq(i);
    }
  }

  if (last && main.attr("value") && main.attr("value").length > 0) {
    var animEndEventNames = {
        'WebkitAnimation' : 'webkitTransitionEnd',
        'OAnimation' : 'oTransitionEnd',
        'msAnimation' : 'MSTransitionEnd',
        'animation' : 'transitionend'
    };
    var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    main.removeAttr("value");

    last.one(animEndEventName, function () {
      main.attr("value", value);
    })
  }
  else {
    main.attr("value", value);
  }
}

function drawprocess(){

      ctx.clearRect(0,0,200,200);
        step+=3;
        //转化为弧度
        var stepAngle = step*Math.PI/180;
        var  deltaHeight = Math.sin(stepAngle)*20;
        var angle;
        var rightangle;
        var deltaHeightRight = Math.cos(stepAngle)*20;

        var y = process + deltaHeight;
        var x = 0 ;
        if(y<40){
          if(y<0){
            y=0;
          }
          x=40-Math.sqrt(1600-Math.pow((40-y),2));
          angle=Math.PI+Math.atan((40-y)/(40-x));
        }
        else if(y>160){
          if(y>200){
            y=200;
          }
          x=40-Math.sqrt(1600-Math.pow((y-160),2));
          angle=Math.PI-Math.atan((y-160)/(40-x));
        }
        var rightY = process + deltaHeightRight;
        var rightX = 200;
        if(rightY<40){
          if(rightY<0){
            rightY=0;
          }
          rightX=160+Math.sqrt(1600-Math.pow((40-rightY),2));
          rightangle=-Math.atan((40-rightY)/(rightX-160));
        }
        else if(rightY>160){
          if(rightY>200){
            rightY=200;
          }
           rightX=160+Math.sqrt(1600-Math.pow((rightY-160),2));
           rightangle=Math.atan((rightY-160)/(rightX-160));
          }
        ctx.lineWidth = 1;
        // ctx.fillStyle = "green";
        ctx.fillStyle = "#6F3535";
        ctx.beginPath();
        ctx.moveTo(x,y);
        // ctx.lineTo(rightX, rightY);
        ctx.bezierCurveTo(100, y-25, 100, rightY-25, rightX,rightY);
        if(rightY>160){
          ctx.arc(160,160,40,rightangle,0.5*Math.PI);
        }
        else if(rightY<40){
          ctx.arc(160,40,40,rightangle,0);
          ctx.lineTo(200,160);
          ctx.arc(160,160,40,0,0.5*Math.PI);
        }
        else{
          ctx.lineTo(200,160);
          ctx.arc(160,160,40,0,0.5*Math.PI);
        }
        ctx.lineTo(40,200);
        if(y>160){
        ctx.arc(40,160,40,0.5*Math.PI,angle);
        }
        else if(y<40){
          ctx.arc(40,160,40,0.5*Math.PI,Math.PI);
          ctx.lineTo(0,40);
          ctx.arc(40,40,40,Math.PI,angle);
        }
        else {
          ctx.arc(40,160,40,0.5*Math.PI,Math.PI);
          ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.fill();
        window.requestAnimationFrame(drawprocess);

      }
window.onload=Loading;

function showEncryption() {
  $("#safe_encryption").text(encryption[encryptionIndex]);
  encryptionIndex = (encryptionIndex + 1) % 4;
}

function isWeixinOrQQ() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.search(/(MicroMessenger|MQQBrowser)/i) != -1) {
        return true;
    }
    else {
        return false;
    }
}

function adaptScreen(width) {
    var viewport = document.querySelector("meta[name=viewport]");
    var dpi = (densityDpi > 1) ? (300 * width * densityDpi / width) : densityDpi;
    // if (isWeixinOrQQ()) {
    viewport.setAttribute("content", "width=" + width + ", target-densityDpi=" + dpi);
}

$(window).on("orientationchange", function (event) {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", "width=device-width");
    setTimeout(function () {
        width = $(window).width();
        height = $(window).height();
        if (width > height) {
            adaptScreen(width * 600 / height);
        }
        else {
            adaptScreen(height * 600 / width);
        }
    }, 1000);
});
