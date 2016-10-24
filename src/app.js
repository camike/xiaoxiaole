var arr_ele = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

function couldAdd(row, column ,type){

    var leftCount = 0;
    for(var i=column-1;i>=0;i--)
    {
      if(arr_ele[row][i] == type)
        leftCount ++;
      else break;
    }

    var rightCount = 0;
    for(var i=column+1;i<arr_ele[0].length;i++)
    {
      if(arr_ele[row][i] == type)
        rightCount++;
      else break;
    }

    var topCount = 0;
    for(var i= row-1; i>=0;i--)
    {
      if(arr_ele[i][column] == type)
        topCount++;
      else break;
    }
    var bottomCount = 0;
    for(var i= row+1; i<arr_ele.length;i++)
    {
      if(arr_ele[i][column] == type)
        bottomCount++;
      else break;
    }

    if(leftCount+rightCount+1 >=3 || topCount+bottomCount+1 >=3)
      return false;

    return true;

}


var myLayer = cc.Layer.extend({
    sprite:null,
    s_sprite:null,
    start_label:null,

    ctor:function(){
      this._super();

      var size = cc.director.getWinSize();

      this.sprite = new cc.Sprite(res_resources[0]);
      this.sprite.setPosition(size.width / 2,size.height / 2);
      this.sprite.setAnchorPoint(0.5,0.5);
      this.addChild(this.sprite,1);



    cc.spriteFrameCache.addSpriteFrames("res/loading@2x.818b1300e2db03f616a53bb8b6172270.plist");
      //var batchNode = new cc.SpriteBatchNode(g_menu);
    //  this.addChild(batchNode)loading_button_blue0000
     this.s_sprite = new cc.Sprite("#loading_button_blue0000");
     this.s_sprite.setPosition(size.width/ 2,size.height * 0.3);
     this.s_sprite.setAnchorPoint(0.5,0.5);
     this.addChild(this.s_sprite,1);

     this.start_label = new cc.LabelTTF("开始游戏","宋体",32);
     this.start_label.setPosition(30,20);
     this.start_label.setAnchorPoint(0,0);
     this.s_sprite.addChild(this.start_label,2);

     if('mouse' in cc.sys.capabilities){
       cc.eventManager.addListener({
         event:cc.EventListener.MOUSE,
         onMouseDown:function(event){
           var pos = event.getLocation();
           var target = event.getCurrentTarget();

           cc.director.runScene(new cc.TransitionSlideInL(2,new gameScene()));

         }
       },this.start_label)
     }

    },
})

var gameLayer = cc.Layer.extend({
    background:null,
    sprite_width:null,
    left_space:0,


  ctor:function(){
    this._super();

    var size = cc.director.getWinSize();

    this.background = new cc.Sprite(res_resources[0]);
    this.background.setPosition(size.width / 2, size.height / 2);
    this.background.setAnchorPoint(0.5,0.5);

    this.addChild(this.background,0);

    cc.spriteFrameCache.addSpriteFrames(g_homelist);
    cc.spriteFrameCache.addSpriteFrames(g_ele);
    //buffalo 水牛  "#target.order1_1 instance 10000"
    //flog  青蛙   "#target.order1_2 instance 10000"
    //bear 熊  "#target.order1_3 instance 10000"
    //owl 猫头鹰  "#target.order1_4 instance 10000"
    //fox 狐狸  "#target.order1_5 instance 10000"
    //chick 小鸡  "#target.order1_6 instance 10000"
    //blackbear 黑熊  "#target.order2_1 instance 10000"
    //start blackbeag 有星星的黑熊  "#target.order2_2 instance 10000"

    var arrs = ["#target.order1_1 instance 10000","#target.order1_2 instance 10000","#target.order1_3 instance 10000","#target.order1_4 instance 10000","#target.order1_5 instance 10000","#target.order1_6 instance 10000",]
    var animals = new Array();


    for(var i = 0; i < 6; i++){

      for(var j = 0; j < 10; j++){

        //存放动物头像的框子
        var y= new cc.Sprite("#area_icon_360000");
        this.sprite_width = y.width * 0.6;
        y.setPosition((this.sprite_width) * (j) + this.sprite_width * 2,size.height - this.sprite_width * (i+1))

        this.addChild(y,1);

        var h = Math.floor(Math.random() * 5);

        while(!couldAdd(i,j,h+1))
          h = Math.floor(Math.random() * 5);

        arr_ele[i][j] = h+1;

        var flog = new Animal(arrs[h]);
        flog.finalX = y.width / 2.1;
        flog.finalY = y.height / 2;
        flog.setPosition(flog.finalX,flog.finalY + this.sprite_width * 6);
        flog.setScale(0.9);
        flog.action = cc.moveTo(1.5,cc.p(flog.finalX,flog.finalY));
        y.addChild(flog,2);
        animals[animals.length] = flog;
      }
    }

  //  var ac = cc.moveBy(2,cc.p(0,-300))
  //  var animals = this.getChildren();
    this.scheduleOnce(function(){
      for(var i =0;i<animals.length;i++)
      {
          animals[i].runAction(animals[i].action)
      }
    },1.5)



  }
})


var myScene = cc.Scene.extend({
      onEnter:function(){
        this._super();

        this.addChild(new myLayer(),1);

      }
})

var gameScene = cc.Scene.extend({
  onEnter:function(){
    this._super();

    this.addChild(new gameLayer(),1);
  }
})
