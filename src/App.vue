<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>DRIFT STRUCTURE</h1>
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

music-visualization{
  padding:1px;
  padding-bottom: 20px;
}

</style>
