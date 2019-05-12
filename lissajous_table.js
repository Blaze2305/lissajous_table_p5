let c_h=[];
let c_v=[];
let c=[];
let d;
let points =[];
function setup(){

  createCanvas(2200,2200);

  for(let k=0;k<10;k+=1){
    c_h[k]= new circles(10,k*(200)+150,100,0.5*k+2,1);
    c_v[k]= new circles(150+k*(200),10,100,0.5*k+2,0);
    points[k]=[];
    for(let i=0;i<10;i++){
      points[k][i]=[];
    }
  }

  c=c_h.concat(c_v);
}



function draw(){
  translate(100,100);
  background(0);
  for( let m of c){
    m.show();
    m.point();
    m.update();
    m.l();
  }

  for(let v in c_v){
    for(let h in c_h){
      d=c_v[v].check(c_h[h]);
      if(d){
        push();
        stroke(255);
        strokeWeight(4);
        noFill();
        beginShape();
        points[v][h].push([d.x,d.y]);
        if(points[v][h].length>300){
          points[v][h]=[];
        }
        for(let j=0;j<points[v][h].length;j++){
          vertex(points[v][h][j][0],points[v][h][j][1])
        }
        endShape();
        pop()
      }
    }
  }


}



class circles{

  constructor(x,y,dia,freq,mode){
    this.x=x;
    this.y=y;
    this.dia=dia;
    this.freq=freq;
    this.angle=0;
    this.mode=mode;
    this.px=(this.dia/2)*cos(2*PI*this.freq*this.angle);
    this.py=(this.dia/2)*sin(2*PI*this.freq*this.angle);  // mode ==1 => horizontal mode ==2 => vertical
  }

  show(){
    push();
    noFill();
    stroke(255);
    translate(this.x,this.y);
    ellipse(0,0,this.dia);
    pop();
  }

  update(){

    this.angle+=0.01;
  }

  point(){
    push();
    let px=(this.dia/2)*cos(2*PI*this.freq*this.angle);
    let py=(this.dia/2)*sin(2*PI*this.freq*this.angle);
    translate(this.x,this.y);
    stroke(0,255,0);
    strokeWeight(10);
    point(px,py);
    pop();
  }

  l(){
    let px=(this.dia/2)*cos(2*PI*this.freq*this.angle);
    let py=(this.dia/2)*sin(2*PI*this.freq*this.angle);

    if(this.mode==1){
      push();
      stroke(255,100);
      line(px+this.x,py+this.y, px+1000+this.x,py+this.y)
      pop();
    }
    else{
      push();
      stroke(255,100);
      line(px+this.x,py+this.y,px+this.x,this.y+py+1000);
      pop();
    }
  }

  check(c){  //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const x = (this.dia/2)*cos(2*PI*this.freq*this.angle)+this.x;
    const y = (c.dia/2)*sin(2*PI*c.freq*c.angle)+c.y;
    let pt=createVector(x,y)
    return(pt);

  }
}
