class Player {
  constructor(brain){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.score = 0;
    this.fitness = 0;

    this.currentDir = "RIGHT";
  }


  spawnPoint(){
    let cols = floor(x/scl);
    let rows = floor(y/scl);
    this.x = floor(random(cols));
    this.y = floor(random(rows));
  }

  dir(x,y){
    this.xSpeed = x;
    this.ySpeed = y;
  }

  update(){
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

    //-------Check col with our tail----------//
    for(var i = 0; i < this.tail.length; i++){
      if(this.x == this.tail[i].x && this.y == this.tail[i].y){
        this.restart();
      }
    }
  }

  show(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }

  eat(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d<10){
      this.total++;
      return true;
    }else{
      return false;
    }
  }

  checkDie(next){
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

  restart(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  checkOutOfMap(){
    if(this.tail.length > 0){
      let distance = dist(this.x, this.y, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y);
      if(distance < 1){
        this.restart();
      }
    }
  }
}
