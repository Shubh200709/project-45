var ship,shipImg,space,spaceImg;
var diamondImg,award,awardImg;
var burstImg,gameOver,gameOverImg;
var life,life2,life3,lifeImg,start,startImg,speed,speedImg;
var virusImg,laserImg,laserG;
var diamondG,virusG;
var live=3,score1=0,score2=0;
var gameState=Play;
var Play=1;
var End=0;
var restart,restartImg;

function preload(){
shipImg=loadAnimation("image/plane.png");
spaceImg=loadImage("image/background.png");

diamondImg=loadImage("image/diamond.png");
awardImg=loadImage("image/award.png");

burstImg=loadAnimation("image/burstImg.png");
gameOverImg=loadImage("image/gameover.png");

lifeImg=loadImage("image/lifeline.png");
startImg=loadImage("image/startButton.png");
speedImg=loadImage("image/speed.png");

virusImg=loadImage("image/virus.png");
laserImg=loadImage("image/laser.png");

restartImg=loadImage("image/restart.png");
}

function setup() {
  createCanvas(800,400);
  space=createSprite(50,0,800,400);
  space.scale=2;
  space.addImage(spaceImg);
  
  space.velocityY= (1 + score1/100);

  ship=createSprite(200,300,20,20);
  ship.addAnimation("shooting",shipImg);
  ship.addAnimation("destroyed",burstImg);

  life=createSprite(10,50,10,10);
  life.addImage(lifeImg);
  life.scale=0.1;

  life2=createSprite(50,50,10,10);
  life2.addImage(lifeImg);
  life2.scale=0.1;

  life3=createSprite(90,50,10,10);
  life3.addImage(lifeImg);
  life3.scale=0.1;

  gameOver=createSprite(ship.x,ship.x-20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(ship.x,ship.x-80);
  restart.addImage(restartImg);
  restart.scale=.039;
  restart.visible=false;

  virusG=createGroup();
  diamondG=createGroup();
  laserG=createGroup();
  
}

function draw() {
  //background();  
  
  

  if(space.y>350){
    space.y=0;
    space.x=50;
    }

  space.velocityY= (1 + score1/100);

  if(virusG.isTouching(ship)){
  virusG.destroyEach();
  live=live-1;
    }

  if(live === 2){
  life3.visible=false;
    }

  if(live === 1){
  life2.visible=false;
    }

  if(live === 0){
 life.visible=false;
  }

  if(diamondG.isTouching(ship)){
diamondG.destroyEach();
score2 = score2 + 1;
  }

  if(laserG.isTouching(virusG)){
laserG.destroyEach();
virusG.destroyEach();
  }

  if(life.visible === false){
gameState=End;
//gameOver.visible=true;
ship.scale=.4;
//restart.visible=true;  
  }

  if(keyWentDown("space")){
createLaser();
createLaser2();
  }

  if(keyDown(RIGHT)){
ship.x=ship.x+2;
  }

  if(keyDown(LEFT)){
    ship.x=ship.x-2;
      }
 
 if (gameState === End) {
  ship.changeAnimation("destroyed", burstImg);
  space.velocityY = 0;

diamondG.setLifetimeEach(-1);
virusG.setLifetimeEach(-1);
 
 diamondG.setVelocityYEach(0);
 virusG.setVelocityYEach(0);  
 
 /*if(mousePressedOver(restart)) {
  reset();
}*/

}

drawSprites(); 

spawnVirus();
  spawnDiamond();

text("Lives: "+ live,0,0);

  fill("yellow");
  textSize(20);
  text("Lives",30,30);

  fill("yellow");
  stroke("red");
  textSize(20);
  text("Score: "+score1,2500,50);
  score1=score1+Math.round(getFrameRate()/62);

  fill("gold");
  stroke("yellow");
  strokeWeight(2);
  text("Mineral: "+score2,200,38.3);

}

function reset(){
  if(space.y>350){
    space.y=0;
    space.x=50;
    }

  space.velocityY= (1 + score1/100);

  if(virusG.isTouching(ship)){
  virusG.destroyEach();
  live=live-1;
    }

  if(live === 2){
  life3.visible=false;
    }

  if(live === 1){
  life2.visible=false;
    }

  if(live === 0){
 life.visible=false;
  }

  if(diamondG.isTouching(ship)){
diamondG.destroyEach();
score2 = score2 + 1;
  }

  if(laserG.isTouching(virusG)){
laserG.destroyEach();
virusG.destroyEach();
  }

  if(life.visible === false){
gameState=End;
//gameOver.visible=true;
ship.scale=.4;
//restart.visible=true;  
  }

  if(keyWentDown("space")){
createLaser();
createLaser2();
  }

  if(keyDown(RIGHT)){
ship.x=ship.x+2;
  }

  if(keyDown(LEFT)){
    ship.x=ship.x-2;
      }

  ship.changeAnimation("shooting",shipImg);
  ship.x=200;
  ship.y=300;
  
  life.visible=true;
  life2.visible=true;
  life3.visible=true;
 
  score1=0;
  score2=0;

  gameOver.visible=false;
  restart.visible=false;

  virusG.destroyEach();
  diamondG.destroyEach();
  laserG.destroyEach();
}

function spawnVirus(){
  if(frameCount % 100 === 0){
    var virus=createSprite(Math.round(random(10,300)),0,20,20);
    virus.addImage(virusImg);
    virus.velocityY = (2 + 3*score1/100);
    virus.lifetime=198;
    virus.scale=0.1;
    virusG.add(virus);
   }
}

function spawnDiamond(){
  if(frameCount % 150 === 0){
var diamond=createSprite(Math.round(random(10,300)),0,20,20);
diamond.addImage(diamondImg);
diamond.velocityY = (2 + 2*score1/100);
diamond.lifetime=198;
diamond.scale=.1;
diamondG.add(diamond);
  }
}

function createLaser(){
  var laser=createSprite(100,100,60,10);
  laser.addImage(laserImg);
  laser.scale=.1
  laser.x=ship.x-40;
  laser.y=ship.y;
  laser.velocityY=-4;
  laser.lifetime=200;
  laserG.add(laser);
  return laser;
}

function createLaser2(){
  var laser2=createSprite(100,100,60,10);
  laser2.addImage(laserImg);
  laser2.scale=.1
  laser2.x=ship.x+40;
  laser2.y=ship.y;
  laser2.velocityY=-4;
  laser2.lifetime=200;
  laserG.add(laser2);
  return laser2;
}

