<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/driftLogo.png"> -->
    <h1 class="heading">DRIFT STRUCTURE</h1>
    <h3 class="heading">VISUALIZE YOUR MUSIC</h3>
    <music-selection />
    <music-visualization />
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import MusicVisualization from './components/MusicVisualization.vue';
import MusicSelection from './components/MusicSelection.vue';
import P5 from 'p5';


export default {
  name: 'App',
  data(){
    return {
      thing:0
    }
  },
  components: {
    'music-visualization': MusicVisualization,
    'music-selection': MusicSelection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(247, 4, 4);
  margin-top: 20px;
}

body {
  background-color: darkslategray;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 75%;
}

body::after{
  content: "";
  background: url('./assets/driftLogo2.png');
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}

#heading{
  margin-top:0;
}

music-visualization{
  padding:1px;
  padding-bottom: 20px;
}

</style>
