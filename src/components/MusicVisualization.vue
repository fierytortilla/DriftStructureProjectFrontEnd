<template> 
<div>
    {{message}}
    <audio></audio>
</div>
</template>

<script>
import P5 from 'p5';

var radar = require("../models/Radar.js");


export default {
  name: "MusicVisualization",
  data(){
      return{
          message: ""
      } 
  },
  mounted() {
    new P5(radar.main);
    radar.setDelegate(this.callBackOnP5);
  },
  methods: {
      callBackOnP5: function(timeStr){
          this.message= timeStr;
      }
  },
};
</script>

<style scoped></style>
