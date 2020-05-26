<template>
  <div>
    <label for="">Choose song to visualize</label>
    <select
      name="songs"
      id="songs"
      v-on:change="handleSelectedSong"
      v-model="selectedSongURL"
    >
      <option v-for="(song, index) in songs" :value="song.url" :key="index">{{
        song.title
      }}</option>
    </select>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
    name:'MusicSelection',
    data(){
        return{
            songs:[{
                title: 'someday I will be like noraus',
                url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg'
            },
            {
                title: 'wuthering heights',
                url: "https://upload.wikimedia.org/wikipedia/en/2/20/Kate_Bush_Wuthering_Heights_Sample.ogg"
            },
            {
                title: 'akira',
                url: 'http://localhost:3000/media/akira'
            },
            {
                title: 'beaming husband',
                url: 'http://localhost:3000/media/beamingHusband'
            },
            {
                title: 'dheirich mi moch madainn cheothar',
                url: 'http://localhost:3000/media/dheirichMiMochMadainnCheothar'
            },
            {
                title: "bit about yourself",
                url: 'http://localhost:3000/media/bitAboutYourself'
            },
            {
                title: 'sounded',
                url: 'http://localhost:3000/media/sounded'
            }],
            selectedSongURL:'https://upload.wikimedia.org/wikipedia/commons/1/1a/Am%C5%93ba_-_someday_i_will_be_like_noraus..ogg'
        }
    },
    async beforeMount() {
        this.songs = await fetch('http://localhost:3000/media', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .catch(err => console.error(err))
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

<style scoped></style>
