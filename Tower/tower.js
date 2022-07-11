const blocks = [];
const dirOffset = -250;
const closeOffset = 5;
const blockHeight = 30;
let axis = -1;
let speed = 2;
let direction = 1;
let blockWidth = 150;
let blockDepth = 150;
let transformBy = -50;
let isMouseClicked = false;
let gameStarted = false;
let base;
let score = 0;
let highScore = 0;


function setup() {

    highScore = getItem('tower_game_highscore');
    showScores();

    let Canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    Canvas.parent('mycanvas');

    ortho(-width / 2, width / 2, height / 2, -height / 2, -5000, 5000);
    angleMode(DEGREES);
    colorMode(HSL);

    const position = createVector(0, 0, 0);
    base = new Block(position, blockWidth, blockDepth, 0);
    base.color = color(275, 100, 20);
    blocks.push(base);
}

function draw() {

    background(207, 54, 85);
    pointLight(255, 255, 255, -1200, 300, 1200);
    pointLight(255, 255, 255, 1200, 300, 1200);

    push();
    translate(0, transformBy, 0);
    rotateX(35);
    rotateY(45);
    for (let block of blocks) {
        block.render();
        block.move();
    }
    pop();
}


class Block {
    constructor(pos, w, d, status) {
        this.position = pos;
        this.width = w;
        this.depth = d;
        this.status = status;
        if (blocks.length > 1) {
            let lastcolorhue = hue(blocks[blocks.length - 1].color);
            this.color = color((lastcolorhue + 5) % 360, random(70, 100), 50);
        }
        else {
            this.color = color(random(360), random(70, 100), 50);
        }

    }

    render() {
        push();
        noStroke();
        translate(this.position);
        fill(this.color);
        box(this.width, blockHeight, this.depth);
        pop();
    }

    move() {
        if (this.status == 1 && !isMouseClicked) {
            if (axis == 1) {
                this.position.x -= direction * speed;
            }
            else {
                this.position.z += direction * speed;
            }
            this.changeDir();
        }
    }

    changeDir() {
        if (axis == -1 && this.position.z < dirOffset || this.position.z > -dirOffset) {
            direction = direction * (-1);
        }
        if (this.position.x < dirOffset || this.position.x > -dirOffset) {
            direction = direction * (-1);
        }
    }

}

function startGame() {
    createBlock();
    blocks[blocks.length - 1].color = color(random(360), random(70, 100), 50);
    gameStarted = true;
    hideHtmlText();
}

function createBlock() {
    const previous = blocks[blocks.length - 1];
    const w = previous.width;
    const d = previous.depth;
    let pos;
    if (axis == -1) {
        pos = createVector(previous.position.x, previous.position.y + blockHeight, direction * dirOffset);
    }
    else {
        pos = createVector(direction * dirOffset, previous.position.y + blockHeight, previous.position.z);
    }
    const block = new Block(pos, w, d, 1);
    blocks.push(block);
}

function mouseClicked() {
    if (gameStarted) {
        isMouseClicked = true;
        gamePlay();
        isMouseClicked = false;
    }
    else {
        restartGame();
    }
}

function gamePlay() {
    if (isvalid()) {
        calculateValidPart();
        toggleAxis();
        createBlock();
        increaseSpeed();
        tranformDown(0.6);
        increseScore();
    }
    else {
        gameOver();
    }
}

function toggleAxis() {
    axis = axis * (-1);
}

function increseScore() {
    score = score + 1;
    showScores();
}

function increaseSpeed() {
    speed = constrain(speed + 0.08, 2, 4);
    console.log(speed);
}

function resetSpeed() {
    speed = 2;
}

function resetScore() {
    score = 0;
    showScores();
}

function setHighScore() {
    if (score > highScore) {
        highScore = score;
    }
    storeItem('tower_game_highscore', highScore);
    showScores();
}

function gameOver() {
    gameStarted = false;
    setHighScore();
    resetSpeed();
    blocks.pop();
    showHtmlText();
}

function restartGame() {
    blocks.splice(1, blocks.length);
    transformBy = -50;
    resetScore();
    startGame();
}

function tranformDown(factor) {
    transformBy -= blockHeight * factor;
}


function calculateValidPart() {
    const current = blocks[blocks.length - 1];
    const previous = blocks[blocks.length - 2];
    if (axis == -1) {
        const difference = current.position.z - previous.position.z;
        if (Math.abs(difference) < closeOffset) {
            current.position.z = previous.position.z;
        }
        else {
            current.depth = current.depth - Math.abs(difference);
            current.position.z = current.position.z - (difference / 2);
        }
    }
    else {
        const difference = current.position.x - previous.position.x;
        if (Math.abs(difference) < closeOffset) {
            current.position.x = previous.position.x;
        }
        else {
            current.width = current.width - Math.abs(difference);
            current.position.x = current.position.x - (difference / 2);
        }
    }
    current.status = 0;
}

function isvalid() {
    const current = blocks[blocks.length - 1];
    const previous = blocks[blocks.length - 2];
    let isvalid;
    if (axis == -1) {
        const difference = current.position.z - previous.position.z;
        isvalid = Math.abs(difference) < (current.depth / 2 + previous.depth / 2);
    }
    else {
        const difference = current.position.x - previous.position.x;
        isvalid = Math.abs(difference) < (current.width / 2 + previous.width / 2);
    }
    return isvalid;
}