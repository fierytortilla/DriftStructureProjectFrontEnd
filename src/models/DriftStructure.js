import P5 from "p5";
import "../p5.sound.js";

let fft;
let sound;
let sliderVolume;
let button;
let p5;

const circleNum = 100;
const degree = 360 / circleNum;
const spinNum = 4;

export function cleanup() {
  sound.stop();
  p5.remove();
}

export function main(soundURL) {
  return function(_p5) {
    p5 = _p5;

    p5.preload = () => {
      p5.soundFormats("mp3", "ogg");
      sound = p5.loadSound(soundURL);
    };

    p5.setup = () => {
      let canvas = p5.createCanvas(700, 500);
      canvas.center('horizontal');
      canvas.style('padding','5px');
      canvas.style('opacity', '0.7');
      sliderVolume = p5.createSlider(0, 1, 0.5, 0.01);
      let middleCanvasWidth = canvas.x + (canvas.width/2);
      let bottomCanvasHeight= canvas.y + (canvas.height)+10;
      sliderVolume.position(middleCanvasWidth, bottomCanvasHeight);
      sliderVolume.center('horizontal');
      sliderVolume.style('color', 'violet');
      button = p5.createButton("Pause");
      let div = p5.createDiv('');
      div.html('Volume');
      div.position(sliderVolume.x-60, bottomCanvasHeight);
      div.style('font-family', 'Avenir, Helvetica, Arial, sans-serif');
      div.style('color', 'violet');
      button.mousePressed(toggleSound);
      button.position(middleCanvasWidth+80, bottomCanvasHeight);
      button.style('font-size', '15px')
      button.style('font-family', 'Avenir, Helvetica, Arial, sans-serif');
      button.style('background-color', 'darkslategrey');
      button.style('color', 'violet');
      // _p5.ellipse(_p5.width / 2, _p5.height / 2, 500, 500);
      fft = new P5.FFT();
      // p5.angleMode(DEGREES);
      sound.play();
    };

    p5.draw = () => {
      // p5.background('#222222');
      p5.background('#2F4F4F');
      sound.setVolume(sliderVolume.value());
      //analyze() computes amplitude values along the frequency domain
      let spectrum = fft.analyze();
      // console.log(spectrum);
      // p5.push();
      // let degree = p5.frameCount * 3;
      // let posX = 0;
      // let posY = p5.sin(p5.radians(degree)) * 50;
      // let radius = 50;
      // let speed = 2;
      // p5.ellipse(posX, posY, 50, 50);
      // p5.translate(0, p5.height);
      // posX += speed;
      // if (posX > p5.width || posX < 0) {
      //   p5.stroke(posX)
      //   speed *= -1;
      // }
      // p5.pop();
      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      for (var i = 0; i < spectrum.length; i++) {
        // p5.background(i);
        var angle = p5.map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i];
        var r = p5.map(amp, 0, 256, 20, 100);
        p5.fill(i, 255, 255);
        var x = r * p5.cos(angle);
        var y = r * p5.sin(angle);
        p5.stroke(i, 255, 255);
        p5.line(0, 0, x, y);
        // p5.vertex(x, y);
        //var y = map(amp, 0, 256, height, 0);
        // p5.rect(i * w, y, w - 2, p5.height - y);
      }
      p5.pop();



      p5.noStroke();
      p5.fill(255, 0, 255);
      for (let i = 0; i < spectrum.length; i++) {
        p5.fill(255, 0, 255);
        let x = p5.map(i, 0, spectrum.length, 0, p5.width);
        let h = -p5.height + p5.map(spectrum[i], 0, 255, p5.height, 0);
        //for rect: posX, posY, width, height
        p5.rect(x, p5.height, (p5.width+1) / spectrum.length, h);
      }
      //waveform() computes amplitude values along the time domain
      let waveform = fft.waveform();
      p5.noFill();
      p5.beginShape();
      p5.stroke('#fae');
      for (let i = 0; i < spectrum.length; i++) {
        let x = p5.map(i, 0, waveform.length, 0, p5.width);
        let y = p5.map(waveform[i], -1, 1, 0, p5.height);
        // p5.vertex(x, y);
        // p5.fill(i);
        p5.stroke(i);
      }
      p5.endShape();
    };
  };
}

function toggleSound() {
  if (sound.isPlaying()) {
    sound.pause();
    button.elt.firstChild.data = "Play";
  } else {
    sound.play();
    button.elt.firstChild.data = "Pause";
  }
}
