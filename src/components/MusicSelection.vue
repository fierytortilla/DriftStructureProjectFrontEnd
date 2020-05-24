<template>
    <div>
        <label for="">Choose song to visualize</label>
        <select name="songs" id="songs" v-on:change="startPlayingSelectedSong">
            <option v-for="(song, index) in songs" :value=song.url :key="index">{{song.name}}</option>
        </select>
    </div>
</template>

<script>
// const sawtooth = require('../assets/sawtooth.mp3')

export default {
    name:'MusicSelection',
    data(){
        return{
            songs:[{
                name: 'someday I will be like noraus',
                url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg'
            }],
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