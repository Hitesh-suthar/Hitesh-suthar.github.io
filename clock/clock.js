let hourAngle;
let minuteAngle;
let secondAngle;
let hr;
let mn; 
let sc;
let str = '0';

function setup(){
    createCanvas( 800 , 700 );
    angleMode(DEGREES);    
}

function draw(){
    background(220);
    smooth();
    hr = hour() % 12;
    mn = minute();
    sc = second();
    if( hour() == 12 || hour() == 0 ){
        hr = 12;
    }
    if( hr < 10){
        hr = str.concat(hr);
    }
    if( mn < 10){
        mn = str.concat(mn);
    }
    if( sc < 10){
        sc = str.concat(sc);
    }

    hourAngle = map( hour() % 12 , 0 , 12 , 0 , 360 ) + minute()/2 ;
    minuteAngle = map( minute() , 0 , 60 , 0 , 360 ) + second()/10 ;
    secondAngle = map( second() , 0 , 60 , 0 , 360 );
    
    fill(255,255,255);
    ellipse( width/2 , height/2 , 640 , 640);
    
    push();
    translate(width/2,height/2);
    stroke(0);
    
    for(let i=0; i<360; i++){
        push();
        rotate(i);
        if(i%30 == 0){
            strokeWeight(5);
            point(0,-275);
        }
        if(i%6 == 0 && i%30 != 0 ){
            strokeWeight(1);
            line(0,-273,0,-277);
        }
        pop();
    }
    pop();
   
    push();
   
    translate( width/2 , height/2);  
    rotate(-90);   
    noFill();
    strokeWeight(7);
    
    stroke( 255 , 0 , 0);
    arc( 0 , 0 , 625 , 625 , 0 , secondAngle );
    
    stroke(50,150,50);
    arc( 0 , 0, 600 , 600 , 0 , minuteAngle );
    
    stroke(0,0,255);
    arc( 0 , 0 , 575 , 575 , 0 , hourAngle );
    
    pop();
    
    push();
    translate(width/2,height/2);
    rotate(hourAngle);
    stroke(0,0,255);
    strokeWeight(5);
    line( 0 , 0 , 0, -135);
    line( 0 , 0 , 0, 30);
    textSize(20);
    fill(0,0,255);
    noStroke();
    text( hr , 0 ,-250 );
    pop();

    push();
    translate(width/2,height/2);
    rotate(minuteAngle);
    stroke(50,150,50);
    strokeWeight(4);
    line( 0 , 0 , 0 , -160);
    line( 0 , 0 , 0, 30);
    textSize(20);
    fill(50,150,50);
    noStroke();
    text(mn, 0 ,-225 );
    pop();
   
    push();
    translate(width/2,height/2);
    rotate(secondAngle);
    stroke(255,0,0);
    strokeWeight(3);
    line( 0 , 0 , 0 , -185);
    line( 0 , 0 , 0, 30);
    textSize(20);
    fill(255,0,0);
    noStroke();
    text(sc, 0 ,-200 );
    pop();
    
    push();
    translate(width/2,height/2);
    stroke(0);
    strokeWeight(7);
    point(0,0);
    pop();

    textAlign(CENTER);
    textSize(25);
    noStroke();
    fill(0);
    text("ANALOG CLOCK", 125 ,40);
    text("HITESH SUTHAR", 675 ,40);
    text("TIME", 100 ,630);
    
    if( hour() >= 0 && hour() < 12){
       text("AM", 725 ,660);
    }
    else{
       text("PM", 725 ,660);
    }
      
    text( hr + ' : '+ mn + ' : ' + sc , 100 , 660);

}