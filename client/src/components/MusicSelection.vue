<template>
  <div>
    <label>Choose your song: </label>
    <select name="songs" v-on:change="handleSelectedSong" v-model="selectedSongURL">
      <option v-for="(song, index) in songs" :value="song.url" :key="index">{{song.title}} by {{song.artist}}</option>
    </select>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import SongService from '../services/SongService.js'

export default {
    name:'MusicSelection',
    data(){
        return{
            songs:[],
            selectedSongURL:''
        }
    },
    async beforeMount() {
        this.songs = await SongService.getSongs()
    },
    mounted(){
        this.getSongs();
    },
    methods:{
        handleSelectedSong(){
            eventBus.$emit('song-selected', this.selectedSongURL)
        },
        getSongs(){
            SongService.getSongs()
            .then(songsFromBackEnd=> this.songs=songsFromBackEnd)
        }
    }
}
</script>

<style scoped>

select{
    margin-right: 60px;
}

</style>
