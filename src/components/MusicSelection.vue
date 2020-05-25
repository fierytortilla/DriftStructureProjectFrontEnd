<template>
    <div>
        <label for="">Choose song to visualize</label>
        <select name="songs" id="songs" v-on:change="handleSelectedSong" v-model="selectedSongURL">
            <option v-for="(song, index) in songs" :value=song.url :key="index">{{song.name}}</option>
        </select>
    </div>
</template>

<script>
// const sawtooth = require('../assets/sawtooth.mp3')
import { eventBus } from '@/main.js';

export default {
    name:'MusicSelection',
    data(){
        return{
            songs:[{
                name: 'someday I will be like noraus',
                url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg'
            },
            {
                name: 'wuthering heights',
                url: "https://upload.wikimedia.org/wikipedia/en/2/20/Kate_Bush_Wuthering_Heights_Sample.ogg"
            },
            {
                name: 'akira',
                url: 'http://localhost:3000/media/akira'
            },
            {
                name: 'beamingHusband',
                url: 'http://localhost:3000/media/beamingHusband'
            },
            {
                name: 'dheirichMiMochMadainnCheothar',
                url: 'http://localhost:3000/media/dheirichMiMochMadainnCheothar'
            },
            {
                name: 'pretendYouDidntKnow',
                url: 'http://localhost:3000/media/pretendYouDidntKnow'
            },
            {
                name: 'sounded',
                url: 'http://localhost:3000/media/sounded'
            }],
            selectedSongURL:'https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg'
        }
    },
    mounted(){

    },
    methods:{
        handleSelectedSong(){
            console.log(this.selectedSongURL)
            eventBus.$emit('song-selected', this.selectedSongURL)
        }

    }
}
</script>

<style scoped>

</style>