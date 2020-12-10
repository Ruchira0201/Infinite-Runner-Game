var Play;
var End;
var gameState = "Play";

var score;
var restartImg,gameOverImg;

var spaceImg,space;
var jetImg,jet4;
var astieroidGroup,astieroidImg,astieroidImg2,astieroidImg3,astieroidImg4;

function preload() {
 
  spaceImg = loadImage("space.jpg");
  jetImg = loadImage("jet.jpg");
  astieroidImg = loadImage("astieroid_1.png");
  astieroidImg2 = loadImage("astieroid_4.png");
  astieroidImg3 = loadImage("images.png");
  astieroidImg4 = loadImage("images_1.png")
  gameOverImg = loadImage("Game Over.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(600, 400);
  
  space = createSprite(0,200,20,400);
  space.addImage("space",spaceImg);
  space.velocityX = 2.5;
  space.scale = 3.5;
  
  jet = createSprite(550,200,20,20);
  jet.addImage(jetImg);
  jet.scale = 0.2;
  
  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,230);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  astieroidGroup = createGroup();
  
  jet.setCollider("rectangle",0,0,300,70);
  debug = true
  
  score = 0;
}

function draw() {
  
  if(gameState === "Play"){
    
    gameOver.visible = false;
    restart.visible = false;
    
    space.velocityX = 2.6;
    
    score = score + Math.round(getFrameRate()/60);
    
 if (space.x > 400){
   space.x = space.width/2;
 } 
  
 if (keyWentDown(UP_ARROW)){
   jet.velocityY = -5;
 }
  
  if (keyWentUp(UP_ARROW)){
    jet.velocityY = 0;
  }
 
  if (keyWentDown(DOWN_ARROW)){
    jet.velocityY = 5;
  }
  
  if (keyWentUp(DOWN_ARROW)){
    jet.velocityY = 0;
  }
    
    if (astieroidGroup.isTouching(jet)){
      gameState = "End";
    }
  
  spawnAstieroids();
  }
  
    if (gameState === "End"){
      if (astieroidGroup.isTouching(jet)){
    
       space.velocityX = 0;
       astieroidGroup.setVelocityXEach(0);
       astieroidGroup.setLifetimeEach(-1);
       astieroidGroup.destroyEach();
       jet.velocityY = 0;
        
      gameOver.visible = true;
      restart.visible = true;
  }
  if (mousePressedOver(restart)) {
      reset();
   }
 }
  
  drawSprites();
  
   textSize(15);
  fill("white");
  text("Score: "+ score, 250,50);
  
}

function reset(){
  gameState = "Play";
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}

function spawnAstieroids(){
  if (frameCount % 30 === 0){
    var astieroid = createSprite(0,100,20,20);
    astieroid.y = Math.round(random(0,400));
    astieroid.velocityX = (6 + score/100);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: astieroid.addImage(astieroidImg);
        astieroid.setCollider("circle",0,0,100);
        debug = true;
        break;
      case 2: astieroid.addImage(astieroidImg2);
        astieroid.setCollider("circle",0,0,55);
        debug = true;
        break;  
      case 3: astieroid.addImage(astieroidImg3);
        astieroid.setCollider("circle",23,-5,70);
        debug = true;
        break; 
      case 4: astieroid.addImage(astieroidImg4);
        astieroid.setCollider("circle",25,0,75);
        debug = true;
        break;  
      default: break;  
    }
    
    astieroid.scale = 0.4;
    astieroid.lifetime = 200;
    
    astieroidGroup.add(astieroid);
  } 
}