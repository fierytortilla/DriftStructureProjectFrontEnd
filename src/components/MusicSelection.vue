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
            console.log(this.selectedSongURL)
            eventBus.$emit('song-selected', this.selectedSongURL)
        },
        getSongs(){
            SongService.getSongs()
            .then(songsFromBackEnd=> this.songs=songsFromBackEnd)
        }

    }
}
</script>

<style scoped></style>
