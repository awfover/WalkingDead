var can1;
var ctx1;
var can2;
var ctx2;
var can3;
var ctx3;
var can4;
var ctx4;
var mx;
var my;
var time;
var imgload;
var timedata;
var shoutImage=[]
var hurtImage=new Image();
var count=0;
var gun;
var man;
var gameover=false;
var gameResult = -1;
var canWidth,canHeight;
var deltaTime;
var lastTime;
var walkers;
var shoutImageIndex = [];
var blood = [ {x: 130, y: 235}, {x: 630, y: 445}, {x: 555, y: 130},
              {x: 290, y: 325}, {x: 635, y: 370}, {x: 340, y: 340} ];
function Game(){
  document.getElementById("message").style.display="none";
  document.getElementById("room-2").style.display="block";
  game();
}
function game(){
    time=self.setInterval("clock()",1000);
    init();
    gameloop();
  }

function init(){
	//...
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext('2d');//绘制背景，僵尸,时间，子弹数目
    can2=document.getElementById("canvas2");
    ctx2=can2.getContext('2d');//绘制准星
    can3=document.getElementById("canvas3");
    ctx3=can3.getContext('2d');//击中特效，被击中特效。
    can4=document.getElementById("canvas4");
    ctx4=can4.getContext('2d');//击中特效，被击中特效。
    shoutImageInint();
    ctx1.font="24px Verdana";
    ctx3.font="28px Verdana";
    canWidth=can1.width;
    canHeight=can1.height;
    walkers=new walkersObj();
    timedata=60;
    walkers.init();
    can2.addEventListener("mousemove",onMouseMove,false);
    can2.addEventListener("click",onMouseClick,false);
    lastTime=Date.now();
    gun=new gunObj();
    gun.bullet=images.bullet;
    man=new healthObj();
    man.healthImage=images.healthImage;
}
function clock(){
    if(!gameover){
       if(timedata>0){
          timedata--;
      }
      else {
       gameover=true;
       gameResult = 1;
       ctx3.fillStyle="rgba(255,255,255)";
       ctx3.fillText("Alive",canWidth/2,canHeight/2);
       for(var i=0;i<6;i++){
         walkers.alive[i]=false;
       }

       if (res["door301"].state == "default") {
         setTimeout(function () {
            describe("room3texthaveshout");
            menuChange("next");
            $("#main_next").one("click", function () {
              $(".room-2").fadeOut();
              $(".view-prev").fadeIn();
              $(".view-next").fadeIn();
              $(".backpack").fadeIn();
              $(".room-3").fadeIn();
              $(".backpack-description").text("你刚在这陌生的房间醒来，想办法逃出去。");
              roomNow = 3;
            });
         }, 1000);
       }
       else {
          setTimeout(function () {
            $(".room-2").fadeOut();
            passGame(true);
          }, 1000);
       }
      }
    }
}
function gameloop(){
  if (!gameover) {
    requestAnimFrame(gameloop);
  }
  else {
    return;
  }

	var now=Date.now();
    deltaTime=now - lastTime;
    lastTime=now;
    //if(deltaTime>40) deltaTime=40;
    if(timedata<0){
        window.clearInterval(time);
        timedata=0;
    }
    drawback();
    gun.reload();
    gun.draw();
    man.draw();
    if(!gameover){
       walkersMonitor();
    }
    walkers.draw();
}
function onMouseMove(e){
	if(e.offSetX||e.layerX){
        mx=e.offsetX==undefined?e.layerX:e.offsetX;
        my=e.offsetY==undefined?e.layerY:e.offsetY;
        mx+=15;
        my+=15;
    }
}
function onMouseClick(){
   if(!gameover){
      gun.shout();
      if(!gun.reloading){
          ctx2.clearRect(canWidth-120,canHeight-30,800,600);
             for(var i=0;i<6;i++){
                    if(isMobile){
                        if(((mx-walkers.headx[i])<0.15*walkers.w[i])&&((mx-walkers.headx[i])>-0.5*walkers.w[i])&&((my-walkers.heady[i])<0.23*walkers.h[i])&&((my-walkers.heady[i])>-0.3*walkers.h[i])){
                           walkers.image[i]=images.hitImage;
                           walkers.isdead[i]=true;
                           playSound("sound2","wav/attacked.wav");
                           drawShoutBlood(shoutImage[count], blood[shoutImageIndex[count]].x, blood[shoutImageIndex[count]].y, walkers.headx[i], walkers.heady[i], 0, 0);
                           count=(count+1)%15;
                           setTimeout(function(){ctx4.clearRect(0,0,800,600);},500);
                        }
                    }
                    else {
                        if(((mx-walkers.headx[i])<0.09*walkers.w[i])&&((mx-walkers.headx[i])>-0.37*walkers.w[i])&&((my-walkers.heady[i])<0.185*walkers.h[i])&&((my-walkers.heady[i])>-0.16*walkers.h[i])){
                           walkers.image[i]=images.hitImage;
                           walkers.isdead[i]=true;
                           playSound("sound2","wav/attacked.wav");
                           drawShoutBlood(shoutImage[count], blood[shoutImageIndex[count]].x, blood[shoutImageIndex[count]].y, walkers.headx[i], walkers.heady[i], 0, 0);
                           count=(count+1)%15;
                           setTimeout(function(){ctx4.clearRect(0,0,800,600);},500);
                        }

                    }
              }
     }
  }
}
function drawback(){
    ctx1.drawImage(images.backpic,0,0, canWidth,canHeight);
    ctx1.fillStyle="white";
    ctx1.fillText("Time:"+timedata,canWidth/2,canHeight-20);
}
function shoutImageInint(){
  for(var i=0;i<15;i++){
    var rand;
    shoutImage[i]=new Image();
    rand=parseInt(Math.random()*6+1);
    if(rand==7) rand=6;
    shoutImage[i].src="./image/hit"+rand+".png";
    shoutImageIndex[i] = rand - 1;
  }
}
 function playSound(obj,url){
   //document.getElementById(obj).src=url;
   var sound = document.createElement("audio");
   sound.setAttribute("src", url);
   sound.setAttribute("autoplay", "true");
   $("room-2").append(sound);

   sound.onended = function () {
       $(sound).remove();
   }
 }

function drawShoutBlood(img, cx1, cy1, cx2, cy2, w, h) {
    if ((w >= img.width) && (h >= img.height)) {
        return;
    }

    var d = 40;

    w += d;
    h += d;

    var sx = cx1 - w / 2,
        sy = cy1 - h / 2,
        dx = cx2 - w / 2,
        dy = cy2 - h / 2;

    ctx4.clearRect(0, 0, 800, 600);
    ctx4.drawImage(img, sx, sy, w, h, dx, dy, w, h);

    setTimeout(function () {
        drawShoutBlood(img, cx1, cy1, cx2, cy2, w, h);
    }, 15);
}

function passGame(opt) {
    //这里是游戏结束
    $(".backpack-bar").hide();
    $(".view-prev").hide();
    $(".view-next").hide();

    $("#load").show();
    $(".menu_main").fadeIn();

    setTimeout(function () {
      describe("Loadingtext");
      menuChange("again");
    }, 500);
}

var isMobile = {
   Android: function() {
       return navigator.userAgent.match(/Android/i) ? true: false;
   },
   BlackBerry: function() {
       return navigator.userAgent.match(/BlackBerry/i) ? true: false;
   },
   iOS: function() {
       return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
   },
   Windows: function() {
       return navigator.userAgent.match(/IEMobile/i) ? true: false;
   },
   any: function() {
       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
   }
};
