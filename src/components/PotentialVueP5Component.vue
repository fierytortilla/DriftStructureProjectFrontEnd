<template>
<div>
    <vue-p5 v-on:click="{setup, draw}"></vue-p5>
</div>
</template>

<script>
// import Vue from 'vue';
import VueP5 from 'vue-p5';

export default {
    components: {
        'vue-p5':VueP5
    },
    methods: {
        setup(sketch) {
            sketch.createCanvas(500, 500);
            sketch.background('green');
            sketch.resizeCanvas(400, 400);
            // sketch.text('Hello p5!', 20, 20);
        },
        // render(h){
        //     return h(VueP5, {on: this});
        // }
        draw(sketch){
            sketch.background('green');
        }
    }
}
</script>

<style>

</style>