var gunObj=function (){
    this.num=7;
    this.reloading=false;
    this.reloadTime=0;
    this.bullet=new Image();
}
gunObj.prototype.shout=function(){
	if(!this.reloading){
	  if(this.num>0){
	  	 playSound("sound1","wav/shoot.wav");
	     this.num--;
         if(this.num==0){
          this.reloading=true;
         }
        }
   }
}
gunObj.prototype.reload=function (){
	if(this.reloading){
	   if(this.reloadTime<=1000){
		  this.reloadTime+=deltaTime;
	   }
	   else if(this.reloadTime>1000){
	   	  playSound("sound1","wav/prepare.wav");
	   	  this.reloadTime=0;
	   	  this.num=7;
	   	  this.reloading=false;
	   }
	   //$("#debug").text(this.reloadTime);
	}
}
gunObj.prototype.draw=function(){
	var sw=canWidth;
	ctx2.clearRect(0, 0, 800, 600);
	for(var i=0;i<this.num;i++){
		ctx2.drawImage(this.bullet,sw-30,canHeight-30,11,19);
		sw-=15;
	}
}
