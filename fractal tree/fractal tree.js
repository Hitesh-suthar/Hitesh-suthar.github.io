let slider1 , slider2;
let len = 230 ;


function setup(){
    createCanvas(windowWidth,windowHeight);
     
    slider1 = createSlider(1,10,6,0.001);
    slider1.position(10, 10);
    slider1.style('width', '200px');
  
    slider2 = createSlider(0,0.75,0.67,.05);
    slider2.position(windowWidth-230, 10);
    slider2.style('width', '200px');
    
}

function draw(){
    background(0);
    translate(width/2,height);
    branch(len);
}

function branch(len){
   
    stroke(255);
    strokeWeight(1);

    line(0,0,0,-len);
    translate(0,-len);
    let val1 = slider1.value();
    let val2 = slider2.value()

    push();
    rotate( PI/val1);
    if(len > 10){
        branch(len * val2);
    }
    pop();

    push();
    rotate(-PI/val1);
    if(len > 10){
        branch(len * val2);
    }
    pop();

}