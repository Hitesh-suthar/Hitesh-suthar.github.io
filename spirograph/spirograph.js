let speed = document.getElementById('speed').value;
let spiral;

function setup() {
    const width = document.body.clientWidth - 15;
    const height = width < windowHeight ? width : windowHeight;
    createCanvas(width, height);
    colorMode(HSB);
    spiral = new spirograph(speed);
}

function draw() {
    background(0, 0, 0);
    translate(width / 2, height / 2);
    if (spiral) {
        spiral.construct();
        spiral.show();
    }
    else {
        fill(0, 0, 255, 0.5);
        textAlign(CENTER);
        textSize(34);
        text("Click on new spiral", 0, 0)
    }
}

function newSpiral() {
    speed = document.getElementById('speed').value;
    spiral = new spirograph(speed);
    loop();
}

function download() {
    saveCanvas('myCanvas', 'png');
}

function reset() {
    spiral = null;
    noLoop();
}

class spirograph {

    constructor(speed , R = (width < height ? width / 2 : height / 2), l = random(0, 1), k = random(0, 1)) {
        this.R = R;
        this.l = l;
        this.k = k;
        this.step = 0.1;
        this.speed = speed;
        this.t = 0;
        this.isdrawing = true;
        this.points = [];
        this.color = color(random(255), random(255), random(200, 255));
    }

    construct() {
        if (this.isdrawing) {
            for(let i=0;i<this.speed; i++){
                const P = {
                x: this.R * ((1 - this.k) * Math.cos(this.t) + this.l * this.k * Math.cos(((1 - this.k) * this.t) / this.k)),
                y: this.R * ((1 - this.k) * Math.sin(this.t) - this.l * this.k * Math.sin(((1 - this.k) * this.t) / this.k))
                };
                this.t = this.t - this.step;
                this.points.push(P);
            }
        }
        if (this.points.length > 6000) this.isdrawing = false;
    }

    show() {
        push();
        beginShape();
        stroke(this.color);
        noFill();
        for (let p of this.points) {
            vertex(p.x, p.y);
        }
        endShape();
        pop();
    }

    play() {
        this.isdrawing = true;
    }
    pause() {
        this.isdrawing = false;
    }
}

function handlechange(e){
    document.getElementById('speedvalue').innerHTML = e.value;
    spiral.speed = e.value;
}
