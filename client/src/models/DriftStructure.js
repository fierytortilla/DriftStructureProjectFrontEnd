import P5 from "p5";
import "../p5.sound.js";

let p5;
let canvas
let fft;
let sound;
let sliderVolume;
let buttonPausePlay;

let sliderRed;
let sliderGreen;
let sliderBlue;

const circleNum = 100;
const degree = 360 / circleNum;
const spinNum = 4;
let radius= 50;
let speed = 6;

export function cleanup() {
  sound.stop();
  p5.remove();
}

export function main(soundURL, currentlySelectedVisuals) {
  return function(_p5) {
    p5 = _p5;

    p5.preload = () => {
      p5.soundFormats("mp3", "ogg");
      sound = p5.loadSound(soundURL);
    };

    p5.setup = () => {
      canvas = p5.createCanvas(p5.windowWidth-100, p5.windowHeight-100);
      canvas.center("horizontal");
      canvas.style("padding", "5px");
      canvas.style("opacity", "0.9");
      sliderVolume = p5.createSlider(0, 1, 0.5, 0.01);
      let middleCanvasWidth = canvas.x + canvas.width / 2;
      let bottomCanvasHeight = canvas.y + canvas.height + 10;
      sliderVolume.position(canvas.x+10, bottomCanvasHeight);
      sliderVolume.center("horizontal");
      sliderVolume.style("color", "violet");
      buttonPausePlay = p5.createButton("Pause");
      let divVolume = p5.createDiv("");
      divVolume.html("Volume");
      divVolume.position(sliderVolume.x - 60, bottomCanvasHeight);
      divVolume.style("font-family", "Avenir, Helvetica, Arial, sans-serif");
      divVolume.style("color", "violet");
      buttonPausePlay.mousePressed(toggleSound);
      buttonPausePlay.position(middleCanvasWidth + 80, bottomCanvasHeight);
      buttonPausePlay.style("font-size", "15px");
      buttonPausePlay.style("font-family", "Avenir, Helvetica, Arial, sans-serif");
      buttonPausePlay.style("background-color", "darkslategrey");
      buttonPausePlay.style("color", "violet");

      sliderRed = p5.createSlider(0, 255, 25);
      sliderGreen = p5.createSlider(0, 255, 125);
      sliderBlue = p5.createSlider(0, 255, 125);
      sliderRed.position(canvas.width-60, canvas.y);
      sliderGreen.position(canvas.width-60, sliderRed.y+20);
      sliderBlue.position(canvas.width-60, sliderGreen.y+20);

      let divRed = p5.createDiv("");
      let divGreen = p5.createDiv("");
      let divBlue = p5.createDiv("");
      divRed.html("Red");
      divGreen.html("Green");
      divBlue.html("Blue");
      divRed.position(sliderRed.x - 44, canvas.y);
      divRed.style("font-family", "Avenir, Helvetica, Arial, sans-serif");
      divRed.style("color", "red");
      divGreen.position(sliderRed.x - 44, sliderGreen.y-2);
      divGreen.style("font-family", "Avenir, Helvetica, Arial, sans-serif");
      divGreen.style("color", "green");
      divBlue.position(sliderRed.x - 44, sliderBlue.y-2);
      divBlue.style("font-family", "Avenir, Helvetica, Arial, sans-serif");
      divBlue.style("color", "blue");


      fft = new P5.FFT();
      sound.play();
    };

    p5.draw = () => {
      p5.background("#2F4F4F");
      sound.setVolume(sliderVolume.value());
      const red = sliderRed.value();
      const green = sliderGreen.value();
      const blue = sliderBlue.value();

      //analyze() computes amplitude values along the frequency domain, each value represents amplitude at that slice of the frequency spectrum
      let spectrum = fft.analyze();
      //waveform() computes amplitude values along the time domain, each value represents amplitude of the waveform at that sample of time.
      let waveform = fft.waveform();

      //VISUAL SECTION 1:expanding and contracting elliptical visuals
      if(currentlySelectedVisuals.visualSetting1==true){
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        for (let i = 0, step = 0; i < 360 * spinNum; i += degree, step += 1) {
          const angle = p5.radians(i);
          let x = (radius + step) * p5.cos(angle);
          let y = (radius + step) * p5.sin(angle);
          let fillRed= fft.getEnergy('highMid');
          let fillGreen = fft.getEnergy('mid');
          let fillBlue = fft.getEnergy('bass');
          p5.stroke(fillRed, fillGreen, fillBlue);
          p5.strokeWeight(p5.map(fft.getEnergy('mid'), 0, 255, 2, 10));
          p5.fill(red, green, blue);
          p5.rotate(1);
          let randRadius = p5.random(15,20);
          let randHeight = p5.random(15,20);
          p5.ellipse(x, y, randRadius, randHeight);
        }
        p5.pop();
        radius += speed;
        if (radius > 360 || radius < -360 * 2) {
          speed *= -1;
        }
      }
      //VISUAL SECTION 2: center of extending light
      if(currentlySelectedVisuals.visualSetting2==true){
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        for (var i = 0; i < spectrum.length; i++) {
          let angle = p5.map(i, 0, spectrum.length, 0, 360);
          let amp = spectrum[i];
          let r = p5.map(amp, 0, 256, 0, 100);
          p5.fill(i, 255, 255);
          let x = r * p5.cos(angle);
          let y = r * p5.sin(angle);
          let rand= p5.random(255);
          let fillGreen = fft.getEnergy('mid');
          let fillBlue = fft.getEnergy('bass');
          p5.stroke(i, fillGreen, blue, rand);
          p5.line(0, 0, x * 5, y * 5);
        }
        p5.pop();
      }

      //VISUAL SECTION 3: traditional freq vs amplitude
      if(currentlySelectedVisuals.visualSetting3==true){
        p5.push();
        p5.noStroke();
        for (let i = 0; i < spectrum.length; i++) {
          let fillGreen = fft.getEnergy('mid');
          let fillBlue = fft.getEnergy('bass');
          if(i%10==0){
            p5.fill(red, green, blue);
          } else {
            p5.fill(red, fillGreen, fillBlue);
          }
          let x = p5.map(i, 0, spectrum.length, 0, p5.width);
          let h = -p5.height + p5.map(spectrum[i], 0, 255, p5.height, 0);
          p5.rect(x, p5.height, (p5.width) / spectrum.length, h);
        }
        p5.pop();
      }

      //VISUAL SECTION 4: speech waves
      if(currentlySelectedVisuals.visualSetting4==true){
        p5.push();
        p5.noFill();
        p5.beginShape();
        for (let i = 0; i < spectrum.length; i++) {
          let fillBlue = fft.getEnergy('bass');
          let x = p5.map(i, 0, waveform.length, 0, p5.width);
          let y = p5.map(waveform[i], -1, 1, 0, p5.height);
          p5.vertex(x, y);
          // p5.fill(i);
          let rand = p5.random(255);
          p5.stroke(red, green, fillBlue, rand);
          p5.strokeWeight(2);
        }
        p5.endShape();
        p5.pop();
      }
    };
  };
}

function toggleSound() {
  if (sound.isPlaying()) {
    sound.pause();
    buttonPausePlay.elt.firstChild.data = "Play";
  } else {
    sound.play();
    buttonPausePlay.elt.firstChild.data = "Pause";
  }
}
