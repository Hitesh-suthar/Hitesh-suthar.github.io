let recordx = [],recordy = [];
let x , y, acceleration = 1;
let angle = 0;

function setup(){
    createCanvas(800,700);
    angleMode(DEGREES);
    frameRate(60); 
}
function draw(){
    background(220);
    spiral();
}

function spiral(){
    push();
    translate(width/2,height/2); 
    rotate(3*angle); 
    acceleration -= 0.0008;
    angle += acceleration;
    noFill();
    x = angle/2 * cos(10*angle);
    y = angle/2 * sin(10*angle);
    stroke(255,0,0);
    strokeWeight(6);
    point(x,y);
    
    recordx.push(x);
    recordy.push(y);
    beginShape(); 
    for(let i = 0; i < recordx.length; i++){
        stroke(0);
        strokeWeight(1);            
        vertex(recordx[i],recordy[i]);    
    }
    endShape();

    if(acceleration < 0 ){
        angle=0;
        acceleration = 1;
        recordx = [];
        recordy = [];
    }
    if(recordx.length>150){
        recordx.shift(1);
        recordy.shift(1);
    }

    pop();

}