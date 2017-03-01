var healthObj=function(){
	this.healthNum=5;
	this.dead=false;
    this.alpha=0;
    this.healthImage=new Image();
}
healthObj.prototype.hurt=function(){
	ctx2.clearRect(20,canHeight-30,170,600);
	if(!this.dead){
	this.healthNum--;
	if(this.healthNum==0){
		this.dead=true;
	}
  }
}
healthObj.prototype.draw=function(){
	if (gameover) {
		return;
	}
	var sw=0;
    for(var i=0;i<this.healthNum;i++){
      ctx2.drawImage(this.healthImage,sw+20,canHeight-30);
      sw+=30;
    }
    ctx3.fillStyle="white";
	if(this.dead){
		this.alpha=1;
		ctx3.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx3.fillText("GAMEOVER",canWidth/2-50,canHeight/2);
		gameover=true;
		setTimeout(function () {
			$(".frame").hide();
			passGame(false);
		}, 2000);
	}
}
