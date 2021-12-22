var background;
var panda;
var ground,apple,obstacle
var score=0;
var gameState="play"

function preload(){
  jumpSound = loadSound("assets/jump.wav")
  collidedSound = loadSound("assets/collided.wav")
  backgroundImg = loadImage("assets/background.jpg")
  pandaAnimation= loadAnimation("assets/panda 1.png","assets/panda 2.png","assets/panda 3.png")
  snakeImg=loadImage("assets/snake.png")
  stoneImg=loadImage("assets/stone.png")
  lightningImg=loadImage("assets/lightning.png")
  appleImg=loadImage("assets/apple.png")
  snake3Img=loadImage("assets/snake3.png")
  pandaImg=loadAnimation("assets/panda 1.png")


  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2,width,height)
  bg.addImage(backgroundImg)
  //bg.scale= 0.8;
  bg.velocityX=-3;
 panda= createSprite(130,height-200,20,50)
 panda.addAnimation("panda",pandaAnimation)
 panda.addAnimation("pandastill",pandaImg)
 

  ground = createSprite(width/2,height-30,width,2);
  ground.visible=false;

  obstaclesGroup = new Group();
  appleGroup = new Group();
}

function draw() {
  background(0);
  if(gameState==="play"){
  if(bg.x<0){
    bg.x=bg.width/2
  }
  if( keyDown("SPACE")) {
    jumpSound.play()
    panda.velocityY=-15;
  }
  
  panda.velocityY = panda.velocityY + 0.6;
 
spawnObstacles()
spawnApple()

if(appleGroup.isTouching(panda)){
  apple.remove()
  score=score+5;
}

if(obstaclesGroup.isTouching(panda)){
  collidedSound.play()
  obstacle.remove()
  score=score-15;
  if(score<=0){
   gameState="end"
  }
}
}
panda.collide(ground);
 drawSprites()

 if(gameState==="end"){
  bg.velocityX=0;
  panda.changeAnimation("pandastill",pandaImg)
   fill("red")
  textSize(100)
  text("GAME OVER",500,300)
}

 fill("red")
textSize(20)
 text("SCORE :"+ score,windowWidth-200,40)
}


function spawnObstacles() {
  if(frameCount % 150 === 0) {
    obstacle = createSprite(600,height-40,20,30);
    obstacle.velocityX=-3
    obstacle.scale=0.2

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(snakeImg);
              break;
      case 2: obstacle.addImage(stoneImg);
              break;
      case 3: obstacle.addImage(snake3Img);
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle);
    obstacle.lifetime=300
  } 
  }

  function spawnApple(){
    if(frameCount % 150 === 0) {
    apple = createSprite(600,height-400,20,30) 
    apple.addImage(appleImg)
    apple.scale=0.2
    apple.velocityX=-3

    appleGroup.add(apple);
    apple.lifetime=300
  }
}




