let bubble = [] ;
let n = 30 ;
let alpha = 255 ;
let maxRadius = 50 ;
let minRadius = 30 ;
let gravity ;
let checkbox,checkbox1,checkbox2 ;
let gravityIntensity , backalpha ;
let img;

//function preload(){
//    img = loadImage('background.jpg')
//}


function setup(){
    createCanvas( windowWidth , windowHeight - 45 );
    frameRate( 30 );
    for( let i = 0 ; i < n ; i++ ){
        let rad = random( minRadius , maxRadius );
        let center = new p5.Vector( random( rad , width-rad ) , random( rad , height-rad ));
        bubble[i] = new bubbles( center , rad ); 
    }
    // let i = 0;
    // while( bubble.length <= n ){
       
    //     let rad = random( minRadius , maxRadius );
    //     let center = new p5.Vector( random( rad , width-rad ) , random( rad , height-rad ));
    //     bubble[i] = new bubbles( center , rad  ); 
       
    //     for( let j = 0 ; j < bubble.length-1 ; j++ ){
    //         if( bubble[i].intersect(bubble[j]) ){  
    //             bubble.pop();                        
    //             --i;       
    //         }            
    //     }   
    //     ++i;     
    // }
    gravity = new p5.Vector( 0 , 5 ) ;
  
    checkbox = createCheckbox('Gravity', false);
    checkbox.position( 0, windowHeight-30 );

    checkbox1 = createCheckbox('Pause', false);
    checkbox1.position( windowWidth-80 , windowHeight-30 );
 
    checkbox2 = createCheckbox('Index', false);
    checkbox2.position( windowWidth-150 , windowHeight-30 );
  
    gravityIntensity = createSlider( 0, 20 , 5 );
    gravityIntensity.position( 80 , windowHeight - 30);
    gravityIntensity.style('width', '150px');

    backalpha = createSlider( 0, 255 , 0 );
    backalpha.position( windowWidth/2 - 100 , windowHeight - 30);
    backalpha.style('width', '200px');
}
  
function draw(){
    
    background( 220, 255 - backalpha.value() ); 
    textAlign( CENTER , CENTER );
    for( let i=0 ; i < bubble.length ;i++ ){     
        bubble[i].show(); 
     
        if (checkbox2.checked()) {
            fill(0);
            stroke(0);
            strokeWeight(0.5);
            text( i+1 , bubble[i].pos.x ,bubble[i].pos.y );
        }
      
        if (!checkbox1.checked()) {
            bubble[i].update();   
        }

        if (checkbox.checked()) {
            gravity.y = gravityIntensity.value();
            bubble[i].vel.add(gravity);            
        }    
    }

    if( mouseIsPressed && mouseButton === LEFT ){
        for( let i = 0 ; i < bubble.length ; i++ ){
            let point = {
                x : mouseX,
                y : mouseY
            };         
            if( bubble[i].contain(point) ){
                bubble[i].hover(point);
            }
        }
    }  
}

class bubbles {
    
    constructor( center , r  ) {
        this.r = r;
        this.pos = center;
        this.vel = new p5.Vector( random( -0.2 , 0.2 ) , random( -0.2 , 0.2 ) );
        this.acc = new p5.Vector( random( -0.2 , 0.2 ) , random( -0.2 , 0.2 ) );
        this.color = color( random(255) , random(255) , random(255) , alpha );                    
    }

    show(){
        noStroke();
        fill( this.color );
        ellipse( this.pos.x , this.pos.y , this.r*2 );
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.color.setAlpha(255);      
        stroke( this.color );
        strokeWeight(10);
        
        if( this.pos.y > height-this.r ){    
            if (!checkbox.checked() ) {
                line( this.pos.x-this.r , height , this.pos.x+this.r , height );
            }             
            let diff = this.pos.y + this.r - height ;
            this.pos.y -= (diff + 1) ;
            this.vel.y = -this.vel.y; 
            this.acc.y = random(0.2);          
        }        
        if( this.pos.y < this.r ){
            line( this.pos.x-this.r , 0 , this.pos.x+this.r , 0 );
            let diff = this.r - this.pos.y ;
            this.pos.y += (diff + 1) ;
            this.vel.y = -this.vel.y; 
            this.acc.y = random(0.2);          
        }        
        if( this.pos.x > width-this.r ){
            line( width , this.pos.y-this.r , width , this.pos.y+this.r );
            let diff = this.pos.x + this.r - width ;
            this.pos.x -= (diff + 1) ;
            this.vel.x = -this.vel.x;  
            this.acc.x = random(0.2);                   
        }
        if( this.pos.x < this.r ){
            line( 0 , this.pos.y-this.r , 0 , this.pos.y+this.r );
            let diff = this.r - this.pos.x ;
            this.pos.x += (diff + 1) ;
            this.vel.x = -this.vel.x;  
            this.acc.x = random(0.2);                   
        } 
        
        this.color.setAlpha(alpha);

        if( this.vel.x > 2 ){
            this.acc.x = -this.acc.x;
        }
        if( this.vel.y > 2 ){
            this.acc.y = -this.acc.y;
        }
        if( this.r < minRadius || this.r > height/2 ){
            this.r = random( minRadius , maxRadius );
        }

    } 
    // to check if two bubbles are intersecting or not
    intersect( ball ){
        let distance = dist( this.pos.x , this.pos.y , ball.x , ball.y );
        return distance < this.r + ball.r;
    }
    // to check if two bubble contains the point or not
    contain( point ){
        let d = dist( this.pos.x , this.pos.y , point.x , point.y );
        return d < this.r;
    }

    hover( point ){
        this.pos.x = point.x ;
        this.pos.y = point.y ;
    }
}

function mouseWheel(event) {
    // checking if any bubble is containing mouse pointer
    // if it is resize it with mouse wheel 
    for( let i = 0 ; i < bubble.length ; i++ ){
        let point = {
            x : mouseX,
            y : mouseY
        }          
        if( bubble[i].contain(point) ){
           bubble[i].r += event.delta/20;
        }
    } 
    //to determine whether page had to be scrolled 
    // return true = page will scroll
    // return false = page won't scroll
    return true;
}

function doubleClicked(){
    if(mouseButton === LEFT){

        let isContain = false;
        let point = {
            x : mouseX,
            y : mouseY
        }
        // checking if any bubble is containing mouse pointer
        // if contains that point remove that bubble
        for( let i = 0 ; i < bubble.length ; i++ ){                    
            if( bubble[i].contain(point) ){
                isContain = true;
                bubble.splice( i , 1 );
            }
        } 
        // if not contain create a new bubble somewhere
        if( !isContain ){
            let rad = random( minRadius , maxRadius );     
            let center = new p5.Vector( random( rad , width-rad ) , random( rad , height-rad ) ) 
            let ball = new bubbles( center , rad );
            bubble.push(ball);   
        }    
    }
}

function keyPressed(){   
    // keycode 32 is for space bar 
    // to clear the sketch and the array
    if( keyCode === 32 ){     
       bubble = [];
    }   
}
