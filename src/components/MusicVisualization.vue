<template> 
<div>
</div>
</template>

<script>
import P5 from 'p5';
import { eventBus } from '@/main.js';


let driftStructure = require("../models/DriftStructure.js");

export default {
  name: "MusicVisualization",
  data(){
      return{
          currentlyPlayingSong: ""
        } 
  },
  mounted() {
    eventBus.$on('song-selected', (songURL)=>{
        let p5Instance
        if(!this.currentlyPlayingSong){
            this.p5Instance = new P5(driftStructure.main(songURL));
            this.currentlyPlayingSong= songURL;
        } else if (this.currentlyPlayingSong === songURL) {
            return
        } else if (this.currentlyPlayingSong !== songURL) {
            driftStructure.cleanup()
            this.p5Instance = new P5(driftStructure.main(songURL));
            this.currentlyPlayingSong= songURL;
        }
    })
  },
  methods: {
      callBackOnP5: function(timeStr){
          this.message= timeStr;
      }
  },
};
</script>


<style scoped>

</style>
