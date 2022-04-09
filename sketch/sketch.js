// let slider;
let paths = [];
let currentPath = [];
let select = document.getElementById('weight');

function hex2decimal(){
    let color = document.getElementById("favcolor").value;
    let r = parseInt(color.substr(1,2),16);
    let g = parseInt(color.substr(3,2),16);
    let b = parseInt(color.substr(5,2),16);
    return { r:r , g:g , b:b};
}

function setup(){
    createCanvas(innerWidth,innerHeight-50);
    // slider =  createSlider(1,10,2,1);
    // slider.position(10, innerHeight-20);
    // slider.style('width', '200px');
    colorMode(RGB);
}
function draw(){
    background(230);
    pencil();
}

function pencil(){
    if (mouseIsPressed && mouseButton === LEFT) {
        const point = {
            x : mouseX,
            y : mouseY,
            col : hex2decimal(color),
            thickness : select.options[select.selectedIndex].value
        }
        currentPath.push(point);
    }      
    noFill();
    paths.forEach( path => {
        beginShape();
        path.forEach( point => {           
            stroke(point.col.r,point.col.g,point.col.b);
            strokeWeight(point.thickness);
            vertex(point.x,point.y);
        });      
        endShape();
    });
}

function mousePressed(){
    currentPath = [];
    paths.push(currentPath);  
}
function clean(){
    paths = [];
}
function save(){
    saveCanvas('sketch', 'png');
}