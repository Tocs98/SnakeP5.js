//-------------GLOBAL VARIABLES--------------//
var p; //player
var x = 640;
var y = 480;

var scl = 20;

var food;

function setup(){
  createCanvas(x,y);
  frameRate(10);

  p = new Player();
  pickLocation();
}
function pickLocation() { //Correct spawn of fruit in the map
  var cols = floor(x/scl);
  var rows = floor(y/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw(){
  background(0);

  if(p.eat(food)){
    pickLocation();
  }

  p.update();
  p.show();
  p.checkOutOfMap();

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    p.checkDie("UP");
    p.dir(0,-1);
    p.currentDir = "UP";
  }
  if(keyCode === DOWN_ARROW){
    p.checkDie("DOWN");
    p.dir(0, 1);
    p.currentDir = "DOWN";
  }
  if(keyCode === LEFT_ARROW){
    p.checkDie("LEFT");
    p.dir(-1,0);
    p.currentDir = "LEFT";
  }
  if(keyCode === RIGHT_ARROW){
    p.checkDie("RIGHT");
    p.dir(1,0);
    p.currentDir = "RIGHT";
  }

}
