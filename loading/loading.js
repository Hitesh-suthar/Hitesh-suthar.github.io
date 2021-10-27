let angle1 = 0,angle4 = 0,angle6 = 0;
let pos;
let end1 = 0,end2 = 0;
let radius = 0;
let rad = 50;
let dir = 1;
let r=0,g=0,b=0;
let a = [0,0,0,0,0,0];
let ellipses = [];

function setup(){
   createCanvas(800,700);
   angleMode(DEGREES);
   frameRate(60); 
}
function draw(){
    background(220);
    loading1();
    loading2();   
    loading3();
    loading4();
    loading5();
    loading6();
}
function loading6(){
    push();
    translate(50,150);
    smooth();
    angle6 += 6;
    rotate(angle6);
    noFill();   
    strokeWeight(4);
    stroke(0,130,255,200);
    ellipse(0,0,13,13);  
    stroke(0,200,255)
    arc(0,0,13,13,0,45);
    pop();
}
function loading5(){
    push();
    translate(450,50);
    noStroke();
    angle4 += 4;
    rotate (angle4 % 360);
    
    fill(0);
    ellipses[0] =ellipse(0,-35,25,25);
    fill(32);
    ellipses[1] =ellipse(-35*cos(45),-35*cos(45),23,23);
    fill(64);
    ellipses[2] =ellipse(-35,0,21,21);
    fill(96);
    ellipses[3] =ellipse(-35*cos(45),35*cos(45),19,19);
    fill(128);
    ellipses[4] =ellipse(0,35,17,17);
    fill(160);
    ellipses[5] =ellipse(35*cos(45),35*cos(45),15,15);
    fill(192);
    ellipses[6] =ellipse(35,0,13,13);
    fill(210);
    ellipses[7] =ellipse(35*cos(45),-35*cos(45),11,11);
    pop();
}
function loading4(){
    push();
    translate(350,50);
    noStroke();
    radius = radius + 2;
    rad = 50*abs(sin(radius));

    fill(255,100,0,150);
    ellipse(0,0,rad,rad);
    fill(255,0,0,75);
    ellipse(0,0,50-rad,50-rad);
    pop();
    // if(rad == 50){
    //     dir = -1;
    // }
    // if(rad == 0){
    //     dir = 1;
    // }
    // if(dir == 1){
    //     rad = rad + 1;
    // }
    // if(dir == -1){
    //     rad = rad - 1;
    // }

}
function loading3(){
    push();
    translate(250,50);
    stroke(0);
    strokeWeight(5);
    for(let i = 0; i<6; i++){      
        push();
        a[i] += i+1;
        rotate(a[i]%360);
        point(0,-25);
        pop();
    }
    pop();  
}
function loading2(){
    push();

    translate(150,50);
    end1 = end1 + 3;
    end2 = end2 + 8;
    if(end1 % 360 == end2 % 360){
        r = random(255);
        g = random(255);
        b = random(255);
    }
    
    noFill();
    strokeWeight(6);
    stroke(255,255,255);
    ellipse(0,0,60,60);
    stroke(r,g,b);
    arc(0,0,60,60,end1,end2);

    pop();
}
function loading1(){
    push();
    translate(50,50);
    angle1 = angle1 + 3;   
    rotate(angle1 % 360);
    noStroke();
    pos = abs(10*(sin(2*angle1)+2));
    
    fill(255,152,100,200);
    ellipse(0,pos,15,15);
   
    fill(150,255,0,200);
    ellipse(0,-pos,15,15);
   
    fill(0,150,255,200);
    ellipse(pos,0,15,15);
   
    fill(100,50,125,200);
    ellipse(-pos, 0,15,15);
    
    pop();
}