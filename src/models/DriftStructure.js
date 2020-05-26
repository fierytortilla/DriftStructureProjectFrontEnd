import P5 from "p5";
import "../p5.sound.js";

let fft;
let sound;
let sliderVolume;
let button;
let p5;
let volumeLabel;

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
      let canvas = p5.createCanvas(500, 500);
      canvas.position(200,400);
      canvas.center('horizontal');
      p5.textSize(40);
      sliderVolume = p5.createSlider(0, 1, 0.5, 0.01);
      sliderVolume.position(400,920);
      sliderVolume.center('horizontal');
      button = p5.createButton("Pause");
      volumeLabel= p5.createButton("Volume");
      button.mousePressed(toggleSound);
      button.position(420,950);
      button.center('horizontal');
      volumeLabel.position(320, 905)
      volumeLabel.center('horizontal');
      // _p5.ellipse(_p5.width / 2, _p5.height / 2, 500, 500);
      p5.background(100);
      fft = new P5.FFT();
      sound.play();
    };

    p5.draw = () => {
      p5.background(100);
      sound.setVolume(sliderVolume.value());
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
      for (let i = 0; i < waveform.length; i++) {
        let x = p5.map(i, 0, waveform.length, 0, p5.width);
        let y = p5.map(waveform[i], -1, 1, 0, p5.height);
        p5.vertex(x, y);
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
