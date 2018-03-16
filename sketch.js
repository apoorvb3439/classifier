let n=11;   // highest degree used in classification polynomial
let alpha=0.3;  // learning rate

let points=[];
let theta=[];
let isRed=true;

function setup(){
    createCanvas(windowWidth,windowHeight);
    initTheta();
}

function draw(){
    background(250);
    drawGrid();
    drawPoints();
    gradientDescent();
    drawCurve();

}

function drawGrid(){
    push();
    stroke(0);
    let delta=20;
    for(let y=0; y<=height; y+=delta){
        line(0,y,width,y);
    }
    for(let x=0; x<=width; x+=delta){
        line(x,0,x,height);
    }
    pop();
}

function mousePressed(){
    let colN;
    if(isRed){
        colN=0;
    }else{
        colN=1;
    }
    let point=new Point(mouseX,mouseY,colN);
    points.push(point);
    isRed=!isRed;
    timer=0;
}

function drawPoints(){
    for(let point of points){
        point.draw();
    }
}

class Point{

    constructor(x,y,colorN){
        this.x=x;
        this.y=y;
        this.colorN=colorN;
        this.datax=map(this.x,0,width,0,1);
        this.datay=map(this.y,0,height,1,0);
    }

    draw(){
        push();
        if(this.colorN==0){
            fill(255,0,0);
        }else{
            fill(0,255,0);
        }
        ellipse(this.x,this.y,8,8);
        stroke(0);
        noFill();
        ellipse(this.x,this.y,15,15);
        pop();
    }
}

function initTheta(){
    theta=[];
    theta.push({
        powx: 0,
        powy: 0,
        coeff: random(-1,1)
    });

    for(let i=1; i<=n; i++){
        theta.push({
            powx: i,
            powy: 0,
            coeff: random(-1,1)
        });
    }

    for(let i=1; i<=n; i++){
        theta.push({
            powx: 0,
            powy: i,
            coeff: random(-1,1)
        });
    }

    for(let i=1; i<=n-1; i++){
        theta.push({
            powx: i,
            powy: n-i,
            coeff: random(-1,1)
        });
    }

}

// input of type{x: , y: }
function value(input){
    let res=0;
    for(let t of theta){
        res+=(t.coeff*pow(input.x,t.powx)*pow(input.y,t.powy));
    }
    res=(1/(1+Math.exp(-res)));
    return res;
}

function gradientDescent(){
    let error=0;
    for(let point of points){
        error=point.colorN-value({x: point.datax,  y: point.datay});
        error*=alpha;
        for(let t of theta){
            t.coeff+=(error*pow(point.datax,t.powx)*pow(point.datay,t.powy));
        }
    }
}

function drawCurve(){
    let posx, posy, res;
    for(let i=0; i<1; i+=0.01){
        for(let j=0; j<1; j+=0.01){
            res=value({x: i, y: j});
            if(res<=0.6&&res>=0.4){
                if(res>=0.5){
                    fill(0,255,0,100);
                }
                else{
                    fill(255,0,0,100);
                }
                posx=map(i,0,1,0,width);
                posy=map(j,0,1,height,0);
                ellipse(posx,posy,5,5);
            }
        }
    }
}
