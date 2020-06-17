<template> 
<div>
    <label>Choose your visual(s):  </label>
    <br>
    <label>expanding/contracting ellipticals</label>
    <input type="checkbox" v-model="currentlySelectedVisuals.visualSetting1" value=true>
    <label>center of sun</label>
    <input type="checkbox" v-model="currentlySelectedVisuals.visualSetting2" value=true>
    <label>traditional freq vs amplitude</label>
    <input type="checkbox" v-model="currentlySelectedVisuals.visualSetting3" value=true>
    <label>waveform of freq vs amplitude</label>
    <input type="checkbox" v-model="currentlySelectedVisuals.visualSetting4" value=true>
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
          currentlyPlayingSong: "",
          currentlySelectedVisuals:{'visualSetting1':false, 
                    'visualSetting2':false, 
                    'visualSetting3':false, 
                    'visualSetting4':false}
        } 
  },
  mounted() {
    eventBus.$on('song-selected', (songURL)=>{
        let p5Instance
        if(!this.currentlyPlayingSong){
            this.p5Instance = new P5(driftStructure.main(songURL, this.currentlySelectedVisuals));
            this.currentlyPlayingSong= songURL;
        } else if (this.currentlyPlayingSong === songURL) {
            return
        } else if (this.currentlyPlayingSong !== songURL) {
            driftStructure.cleanup()
            this.p5Instance = new P5(driftStructure.main(songURL, this.currentlySelectedVisuals));
            this.currentlyPlayingSong= songURL;
        }
    });
  }
};
</script>


<style scoped>
label{
    /* display:inline-block; */
    color: rgb(149, 250, 149);
}

input{
    display: inline-block;
}

</style>
