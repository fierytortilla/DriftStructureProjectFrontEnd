let p5;
let delegate;

const circleNum = 100;
const degree = 360 / circleNum;
const degree2 = 360 / circleNum;
const spinNum =  4;

let radius = 50;
var speed = 2;
var speed2 =2;
var posX = 0;

export function main(_p5) {
  p5 = _p5;

  p5.setup = () => {
    p5.createCanvas(500, 500);
    //canvas.parent("p5Canvas");
    // p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
    p5.background(100);
    radius =0;
  };
  p5.draw = () => {
    p5.background(51);
    const degree = p5.frameCount * 3;
    const posY = p5.sin(p5.radians(degree)) * 50;
    p5.push();
    //Specifies an amount to displace objects within the display window. The x parameter specifies left/right translation, the y parameter specifies up/down translation. 
    p5.translate(0, p5.height / 2);
    //controls size of ellipse
    p5.ellipse(posX, posY, 50, 50);
    p5.pop();
    posX += speed;
    if (posX > p5.width || posX < 0) {
      speed *= -1;
    }
    // p5.pop();

    // p5.background(0);
  	p5.push();
  	p5.translate(p5.width / 2, p5.height / 2);
  	p5.noFill();
  	p5.stroke(255);
    for (var i = 0, step = 0; i < 360 * spinNum; i+=degree2, step+=1) {
      const angle = p5.radians(i);
      var x = (radius + step) * p5.cos(angle);
      var y = (radius + step) * p5.sin(angle);
      p5.stroke(255);
  	  p5.rotate(1);
      p5.ellipse(x, y, 15, 15);
      var r = p5.map(i, 0, 360 * spinNum, 0, 255);
      var rand = p5.random(255);
      p5.stroke(r, rand, r, r);
      p5.line(0, 0, x, y);
    }
    p5.pop();

    radius += speed2;

      
    if (radius > 360 || radius < -360 * 2 ) {
        speed *= -1;
    }

    notifyCurrentTime();
  };
}

function notifyCurrentTime() {
  if (delegate !== undefined) {
    const message = p5.hour() + ":" + p5.minute() + ":" + p5.second();
    delegate(message);
  }
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}

