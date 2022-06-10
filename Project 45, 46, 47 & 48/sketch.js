
var backdrop, backdrop_img;
var player, player_img;
var dragonflyGroup, dragonfly, dragonflyPlaying_img, dragonflyEnd_img;
var play = 1;
var gameState = play;
var coin, coin_img, coinGroup;
var score = 0;
var arrow, arrowGroup, arrowImg;



function preload(){
	backdrop_img = loadImage("backdrop.png");
	player_img = loadImage("player.png");
	dragonflyPlaying_img = loadImage("dragonfly_playing.png");
	coin_img = loadImage("coin.png");
	arrowImg = loadImage("arrow.png");

}

function setup() {
	createCanvas(1000, 600);

    backdrop = createSprite(745,300,400,400);
    backdrop.addImage(backdrop_img);
    backdrop.velocityX =  -5;
    backdrop.scale = 2;
	
	player = createSprite(100,450,50,50);
	player.addImage(player_img);
	player.scale=0.5;
	player.debug=true;
	player.setCollider("rectangle",0,0,150,300);

	dragonflyGroup = new Group();
	coinGroup = new Group();
	arrowGroup = new Group();
  
}


function draw() {

  background(0);

  if(gameState === play){

	if(keyDown("UP_ARROW")){
		player.y = player.y - 5;
	}
	if(keyDown("DOWN_ARROW")){
		player.y = player.y + 5;
	}
	if(backdrop.x<270){
		backdrop.x = 745;
	}
	if(keyDown("SPACE")) {
		createArrow();
	}
	if(frameCount % 200 === 0){
		newDragonfly();
	}
	if(frameCount % 170 === 0){
		newCoin();
	}
	if(coinGroup.isTouching(player)){
		coinGroup.destroyEach();
		if(player.scale >= 0.4){
		player.scale = player.scale-0.05;
		}
	  } 
	if(arrowGroup.isTouching(dragonflyGroup)){
		score=score+1;
		arrowGroup.destroyEach();
		dragonflyGroup.destroyEach();
	}

  }
  drawSprites();

  fill("orange");
  textSize(30);
  text("Score: "+score,850,50);
}

function newDragonfly(){
	var dragonfly = createSprite(1000,(random(100,500)),50,50);
	dragonfly.addImage(dragonflyPlaying_img);
	dragonfly.scale = 0.4;
	dragonfly.velocityX = -5;
	dragonfly.lifetime = 300;
	dragonfly.debug=true;
	dragonfly.setCollider("rectangle",0,0,300,350);
	dragonflyGroup.add(dragonfly);
}

function newCoin(){
	var coin = createSprite(1000,500,50,50);
	coin.addImage(coin_img);
	coin.scale = 0.2;
	coin.velocityX = -5;
	coin.lifetime = 300;
	coin.debug=true;
	coin.setCollider("circle",0,0,100);
	coinGroup.add(coin);
}

function createArrow(){
	var arrow = createSprite(195,50,5,10);
	arrow.addImage(arrowImg);
	arrow.y=player.y;
	arrow.scale = 0.5;
	arrow.velocityX = 5;
	arrow.setCollider("rectangle",0,0,260,50);
	arrowGroup.add(arrow);
}



