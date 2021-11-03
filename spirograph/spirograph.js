let spirals = [];
let speed = 0.12;
let n = 1;
let i = 0;
let drawing = true;
let backCol;
function setup(){
    createCanvas(windowWidth,(windowHeight-140));
    colorMode(HSB);
    backCol = color(0,1,95);
    for(let i = 0 ; i < n ; i++){
        spirals[i] = new spirograph(speed);      
    }
}
function draw (){
        background(backCol);
        for(let j = 0 ; j < spirals.length ; j++){
            if(drawing){
                for(let k=0;k<10;k++){
                    spirals[j].construct();
                    i++;
                }
            }
            spirals[j].show();
        }
        if(i>5000) {
            drawing = false;
            noLoop();
        }
    }
}
class spirograph {

    constructor( speed , R = (width < height ? width/2 : height/2) ,  l = random(0,1), k = random(0,1) ){
        this.R = R;
        this.l = l;
        this.k = k;
        this.speed = speed;
        this.t = 0;
        this.points = [];
        this.color = color( random(255) , random(50,255) , random(0,100) );                    
    }

    construct() {
        this.t = this.t - this.speed;
        const P = {
            x : this.R*((1-this.k)*Math.cos(this.t) + this.l*this.k*Math.cos(((1-this.k)*this.t)/this.k)),
            y : this.R*((1-this.k)*Math.sin(this.t) - this.l*this.k*Math.sin(((1-this.k)*this.t)/this.k))
        };
        this.points.push(P);
    }

    show(){
        push();
        translate(width/2,height/2);
        beginShape();
        stroke(this.color);
        noFill();
        for( let p of this.points ){
            vertex(p.x , p.y);   
        }
        endShape();
        pop();
    }
}
function play(){
    drawing = true;
}
function pause(){
    drawing = false;
}
function reset(){
    spirals = [];
    drawing = false;
    loop();
}
function download(){
    saveCanvas('myCanvas', 'png');
}
function newS(){
    spirals.pop();
    i=0;
    let temp = new spirograph(speed);
    spirals.push(temp);
    drawing = true;
    loop();
}
