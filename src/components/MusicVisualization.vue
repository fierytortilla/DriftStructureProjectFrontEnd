<template> 
<div>
    {{message}}
</div>
</template>

<script>
const P5 = require("p5");


export default {
  name: "MusicVisualization",
  data(){
      return{
          message: ""
      } 
  },
  mounted() {
    var radar = require("../models/Radar.js");
    new P5(radar.main);
    // radar.setDelegate(this.callBackOnP5);
  },
  methods: {
      callBackOnP5: function(timeStr){
          this.message= timeStr;
      }
  },
};
</script>

<style scoped></style>
