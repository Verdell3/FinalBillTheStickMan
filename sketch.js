var backGround,backgroundImage;
var stickMan,stickManImage,stick_collided;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7
var coin,money1,money2,money3,money
var ground,groundImage
var restart,restartImg
var gameOver,gameOverImg
var obstaclesGroup,coinGroup
var score = 0;
var life = 3
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backgroundImage = loadImage("Sprites/background.jpg")
  stickImage = loadAnimation("Sprites/running1.png"," Sprites/running2.png","Sprites/running3.png"," Sprites/running4.png"," Sprites/running5.png")
  stick_die = loadAnimation("Sprites/no.png")
  obstacle1 = loadImage("Sprites/blackcar.png");
  obstacle2 = loadImage("Sprites/redTruck.png");
  obstacle3 = loadImage("Sprites/car.png");
  obstacle5 = loadImage("Sprites/ftruck.png");
  obstacle6 = loadImage("Sprites/firehydrent.png");
  obstacle7 = loadImage("Sprites/whitecar.png")

  //Money $$$$$

  money1 = loadImage("Sprites/ecoin.png")
  money2 = loadImage("Sprites/dollors.png")
  money3 = loadImage("Sprites/penny.png")

  gameOverImg = loadImage("Sprites/gameOver.png");
restartImg = loadImage("Sprites/restart.png");

}
function setup(){
createCanvas(displayWidth,displayHeight)

  stickMan = createSprite(100,700,600,10)
  stickMan.addAnimation("running",stickImage)
  stickMan.addAnimation("die", stick_die);
  stickMan.scale = 1.5
  ground = createSprite(100,displayHeight/2+350,200,20)
  ground.visible = false

  gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,windowHeight/2+100);
  restart.addImage(restartImg);

  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup = new Group();
  coinGroup= new Group();

}
function draw(){
  //stickMan.debug = true
background(backgroundImage)

if (gameState === PLAY) {
 
  if (keyDown("space")&&stickMan.y>650) {
    stickMan.velocityY = -15;
  }

  stickMan.velocityY = stickMan.velocityY + 0.8
stickMan.collide(ground)
  spawnObstacles();
  spawnMoney();

  if (coinGroup.isTouching(stickMan)){
    score = score+5
    coinGroup.destroyEach();
  }

  if (obstaclesGroup.isTouching(stickMan)) {
    gameState = END;
    
  }

  }
  else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  stickMan.velocityY = 0

  
  
  obstaclesGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
  
  obstaclesGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);

  stickMan.changeAnimation("die",stick_die);
  if(mousePressedOver(restart)) {
    reset();

  }



    
  }
  
  



  drawSprites();
   textSize(20);
   fill("black");
   text("Score: " + score, 500, 140);
  
  }
  
  function spawnObstacles() {
    if(frameCount % 150 === 0) {
      var obstacle = createSprite(displayWidth,displayHeight/2+300,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(4 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle5);
                break;
        case 5: obstacle.addImage(obstacle6);
                break;
        case 6: obstacle.addImage(obstacle7);
                break;
  
        default: break;
      }
      obstacle.scale = 0.3
      obstaclesGroup.add(obstacle)
    }
  }
    
  
  
  function spawnMoney() {
    if(frameCount % 350 === 0) {
      var money = createSprite(displayWidth,displayHeight/2+100,10,40);
    
      money.velocityX=-5
      //generate random Money
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: money.addImage(money1);
                break;
        case 2: money.addImage(money2);
                break;
        case 3: money.addImage(money3);
                break;
  
        default: break;
      }
      money.scale = 0.2
      coinGroup.add(money)
    }
  }
  
  

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
    
    stickMan.changeAnimation("running",stickImage);
    stickMan.y = 600
    
    score = 0;
    
  }