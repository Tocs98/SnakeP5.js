function Player(){
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.currentDir = "RIGHT";

  this.spawnPoint = function(){
    let cols = floor(x/scl);
    let rows = floor(y/scl);
    this.x = floor(random(cols));
    this.y = floor(random(rows));
  }

  this.dir = function(x,y){
    this.xSpeed = x;
    this.ySpeed = y;
  }

  this.update = function(){
    //---------------CODING TRAIN CHALLENGE SCRIPT---------------//
  for (var i = 0; i < this.tail.length - 1; i++) {
     this.tail[i] = this.tail[i + 1];
   }
   if (this.total >= 1) {
     this.tail[this.total - 1] = createVector(this.x, this.y);
   }
   //----------END OF CODING TRAIN CHALLENGE SCRIPT-------------//

    this.x = this.x + this.xSpeed * scl;
    this.y = this.y + this.ySpeed * scl;

    this.x = constrain(this.x,0, x - scl);
    this.y = constrain(this.y,0, y - scl);


  }

  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }

  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d<10){
      this.total++;
      return true;
    }else{
      return false;
    }
  }

  this.checkDie = function(next){
    if(this.currentDir === "RIGHT" && next === "LEFT"){
      this.restart();
    }if(this.currentDir === "LEFT" && next === "RIGHT"){
      this.restart();
    }if(this.currentDir === "UP" && next === "DOWN"){
      this.restart();
    }if(this.currentDir === "DOWN" && next === "UP"){
      this.restart();
    }
  }

  this.restart = function(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  this.checkOutOfMap = function(){
    if(this.tail.length > 0){
      let distance = dist(this.x, this.y, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y);
      if(distance < 1){
        this.restart();
      }
    }
  }
}
