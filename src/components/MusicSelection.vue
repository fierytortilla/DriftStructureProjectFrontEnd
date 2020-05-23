<template>
    <div>
        <label for="">Choose song to visualize</label>
        <select name="songs" id="songs" v-on:change="startPlayingSelectedSong">
            <option v-for="(song, index) in songs" :value=song :key="index">{{song}}</option>
        </select>
        <audio src='this.selectedSong'>

        </audio>
    </div>
</template>

<script>
const sawtooth = require('../assets/sawtooth.mp3')

export default {
    name:'MusicSelection',
    data(){
        return{
            songs:[sawtooth],
            selectedSong:''
        }

    },
    mounted(){

    },
    methods:{
        startPlayingSelectedSong(song){
            this.selectedSong= song;
        }

    }
}
</script>

<style scoped>

</style>