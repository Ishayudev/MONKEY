var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
let gamestate, restartbutton, restartbuttonimage, gameover, gameoverimage, deadimg;
let highscore;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  deadimg = loadImage("sprite_5.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  restartbuttonimage = loadImage("restart button.png");

  gameoverimage = loadImage("gameover.jpg");
}



function setup() {
  
  score=0;
  highscore=0;

  //monkey
  monkey = createSprite(80, 200);
  monkey.scale = 0.18;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addImage("dead", deadimg);

  //ground
  ground = createSprite(200, 300, 500, 20);

  obstacleGroup = createGroup();

  restartbutton = createSprite(200, 250);
  restartbutton.addImage("re", restartbuttonimage);
  restartbutton.scale = 0.15;

  gameover = createSprite(200, 100);
  gameover.addImage("go", gameoverimage);
  
  FoodGroup=createGroup();

  gamestate = "start";
}


function draw() {
  background("white");
  
  console.log(monkey.y);
  
  monkey.collide(ground);
  monkey.debug=true; 
  monkey.setCollider("circle",0,0,260);

  if (gamestate == "start") {
    fill("red");
    text("press 's' to start", 150, 200);
    monkey.visible = false;
    restartbutton.visible = false;
    gameover.visible = false;

    if (keyDown("s")) {
      gamestate = "play";
    }
  }

  //gamestate is play
  if (gamestate == "play") { 
    
   

    monkey.visible = true;
    restartbutton.visible = false;
    gameover.visible = false;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }

    obstacles();
    bananaf();

   score=score+Math.round(getFrameRate()/60);


    //making the monkey jump.
    if (keyDown("space")&&monkey.y>240) {
      monkey.velocityY = -16;
    }
    //gravity.
    monkey.velocityY = monkey.velocityY + 0.8;


    if (monkey.isTouching(obstacleGroup)) {
      gamestate = "end"
    }

  } //play end

  if (gamestate == "end") {
    restartbutton.visible = true;
    gameover.visible = true;
    monkey.changeImage("dead", deadimg);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score=0;
    monkey.visible = false;

    if (mousePressedOver(restartbutton)) {
      gamestate = "play";
      monkey.changeAnimation("monkey", monkey_running);
    }
  }
  drawSprites();
  text("score:"+score,350,30);
  text("hs:"+highscore,350,50);
}

function obstacles() {
  if (frameCount % Math.round(random(100, 100)) == 0) {
    obstacle = createSprite(420, 270);
    obstacle.scale = 0.15;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -7;
    obstacleGroup.add(obstacle);
  }
}

function bananaf() {
  if (frameCount % 70 == 0) {
    banana = createSprite(420, Math.round(random(250, 150)));
    banana.scale=0.10;
    banana.addImage("bn", bananaImage);
    banana.velocityX = -7;
    FoodGroup.add(banana);
  }
}