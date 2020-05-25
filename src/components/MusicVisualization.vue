<template> 
<div>

</div>
</template>

<script>
import P5 from 'p5';
import "../p5.sound.js";
import { eventBus } from '@/main.js';


var driftStructure = require("../models/DriftStructure.js");


export default {
  name: "MusicVisualization",
  data(){
      return{
          message: ""
      } 
  },
  mounted() {
    eventBus.$on('song-selected', (songURL)=>{
        this.message= songURL;
        new P5(driftStructure.main(songURL));
    })
  },
  methods: {
      callBackOnP5: function(timeStr){
          this.message= timeStr;
      }
  },
};
</script>

<style scoped></style>
