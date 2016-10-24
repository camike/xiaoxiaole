window.onload = function(){
  cc.game.onStart = function(){
    cc.LoaderScene.preload(res_resources,function(){
      cc.director.runScene(new cc.TransitionSlideInT(2,new myScene()))
    },this);
  }
  cc.game.run("gameCanvas");
}
