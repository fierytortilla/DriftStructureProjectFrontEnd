var song;
var sliderVolume;
var sliderRate;
var sliderPan;

function setup() {
  createCanvas(200, 200);
  song = loadSound('../assets/sawtooth.mp3', loaded);
  //song.setVolume(0.5);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
}

function loaded() {
  song.play();
}

function draw() {
  background(random(255));
  song.setVolume(sliderVolume.value());
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

