import P5 from 'p5';
import "../p5.sound.js";

let p5;
let fft;
let delegate;
let sound;

export function main(_p5) {
  p5 = _p5;

  p5.preload= ()=>{
    p5.soundFormats('mp3', 'ogg');
    // sound = p5.loadSound("../assets/sawtooth.mp3");
    sound = p5.loadSound("https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg")
    // sound = p5.SoundFile("../assets/sawtooth")     
  }

  p5.setup = () => {
    p5.createCanvas(500, 500);
    //canvas.parent("p5Canvas");
    // p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
    p5.background(100);
    fft = new P5.FFT();
    sound.play();
    // fft.setInput("../assets/sawtooth.mp3")
    sound.setVolume(0.1);
  };
  p5.draw = () => {
    p5.background(100);
    let spectrum = fft.analyze();
    p5.noStroke();
    p5.fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
      let x = p5.map(i, 0, spectrum.length, 0, p5.width);
      let h = -p5.height + p5.map(spectrum[i], 0, 255, p5.height, 0);
      p5.rect(x, p5.height, p5.width / spectrum.length, h);
    }

    let waveform = fft.waveform();
    p5.noFill();
    p5.beginShape();
    p5.stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = p5.map(i, 0, waveform.length, 0, p5.width);
      let y = p5.map( waveform[i], -1, 1, 0, p5.height);
      p5.vertex(x,y);
    }
    p5.endShape();

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
