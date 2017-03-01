var walkersObj=function(){
	this.x=[];
	this.y=[];
	this.image=[];
	this.alive=[];
	this.spd=[];
	this.w=[];
	this.h=[];
	this.deadtime=[];
	this.headx=[];
	this.heady=[];
	this.isdead=[];
	this.attackTime=[];
}
walkersObj.prototype.init=function(){
	for(var i=0;i<6;i++){
		this.alive[i]=true;
		this.x[i]=Math.random()*600+100;
		this.y[i]=Math.random()*300+100;
		this.spd[i]=Math.random()*0.017+0.003;
		this.w[i]=60;
		this.h[i]=75;
		this.isdead[i]=false;
		this.image[i]=new Image();
		this.deadtime[i]=0;
		this.attackTime[i]=0;
		this.headx[i]=this.x[i];
		this.heady[i]=this.y[i]-0.3*this.h[i];
		this.image[i]=images.normalImage;
	}
	
}
walkersObj.prototype.draw=function(){
     for(var i=0;i<6;i++){
        if(this.alive[i]){
          if(this.isdead[i]){
    	   	  	this.deadtime[i]+=deltaTime;
    	   	  	ctx1.drawImage(this.image[i],this.x[i]-this.w[i]*0.5,this.y[i]-this.h[i]*0.5,this.w[i],this.h[i]);
    	   	  	if(this.deadtime[i]>500){
    	   	  		this.isdead[i]=false;
    	   	  		this.alive[i]=false;  
    	   	  		this.image[i]= images.normalImage;  	   	  		
    	   	  	} 
    	   	  }
    	  else{ 
    	   if(this.w[i]<=120){
    	   	  
    	      this.w[i]+=this.spd[i]*deltaTime;
    	      this.h[i]+=this.spd[i]*deltaTime*1.75;
    	      this.headx[i]=this.x[i];
    	      this.heady[i]=this.y[i]-0.3*this.h[i];
            }
             
           if(this.w[i]>=120&&(!gameover)){
           	 this.image[i]=images.attackImage;
           	 this.attackTime[i]+=deltaTime;
           	 if(this.attackTime[i]>=3000){
              ctx4.drawImage(images.hurtImage,0,0,canWidth,canHeight);
              setTimeout(function(){ctx4.clearRect(0,0,800,600);},400);
              man.hurt();
              this.attackTime[i]=0;
           	 }
           }
           ctx1.drawImage(this.image[i],this.x[i]-this.w[i]*0.5,this.y[i]-this.h[i]*0.5,this.w[i],this.h[i]);  
          }     
        }
   }
}
walkersObj.prototype.born=function(i){
	this.x[i]=Math.random()*600+100;
	this.y[i]=Math.random()*300+100;
	this.spd[i]=Math.random()*0.017+0.003;
    this.alive[i]=true;
    this.w[i]=40;
	this.h[i]=70;
	this.deadtime[i]=0;
	this.attackTime[i]=0;
	this.headx[i]=this.x[i];
	this.heady[i]=this.y[i]-0.3*this.h[i];
}
function walkersMonitor(){
    var num=0;
    for (var i=0;i<6;i++){
        if(walkers.alive[i]) num++;
    }
    if(num<6){
        sendWalkers();
        return;
    }
}
function sendWalkers(){
    for (var i=0;i<6;i++){
        if(!walkers.alive[i]){
        	if(!walkers.isdead[i]){
            walkers.born(i);
        }
            return;
        }
    }
}
