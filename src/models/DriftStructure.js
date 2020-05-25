import P5 from "p5";
import "../p5.sound.js";

let fft;
let delegate;
let sound;
let sliderVolume;
let button;
let _p5;

export function cleanup() {
  sound.stop();
  _p5.remove();
}

export function main(soundURL) {
  return function(p5) {
    _p5 = p5;

    _p5.preload = () => {
      _p5.soundFormats("mp3", "ogg");
      sound = _p5.loadSound(soundURL);
    };

    _p5.setup = () => {
      _p5.createCanvas(500, 500);
      button = _p5.createButton("toggle");
      button.mousePressed(togglesound);
      sliderVolume = _p5.createSlider(0, 1, 0.5, 0.01);
      // _p5.ellipse(_p5.width / 2, _p5.height / 2, 500, 500);
      _p5.background(100);
      fft = new P5.FFT();
      // button = _p5.createButton('toggle');
      // button.mousePressed(togglesound);
      // sound.stop();
      sound.play();
      // fft.setInput("../assets/sawtooth.mp3")
      // sound.setVolume(0.1);
    };
    _p5.draw = () => {
      _p5.background(100);
      sound.setVolume(sliderVolume.value());
      let spectrum = fft.analyze();
      _p5.noStroke();
      _p5.fill(255, 0, 255);
      for (let i = 0; i < spectrum.length; i++) {
        let x = _p5.map(i, 0, spectrum.length, 0, _p5.width);
        let h = -_p5.height + _p5.map(spectrum[i], 0, 255, _p5.height, 0);
        _p5.rect(x, _p5.height, _p5.width / spectrum.length, h);
      }

      let waveform = fft.waveform();
      _p5.noFill();
      _p5.beginShape();
      _p5.stroke(20);
      for (let i = 0; i < waveform.length; i++) {
        let x = _p5.map(i, 0, waveform.length, 0, _p5.width);
        let y = _p5.map(waveform[i], -1, 1, 0, _p5.height);
        _p5.vertex(x, y);
      }
      _p5.endShape();

      notifyCurrentTime();
    };
  };
}

function togglesound() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}
