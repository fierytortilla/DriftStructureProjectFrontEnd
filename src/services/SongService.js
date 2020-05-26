const baseURL = 'http://localhost:3000/media/'

export default {
  async getSongs(){
    return await fetch(baseURL, { 
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .catch(err => console.error(err))
  },
  async postSong(payload){
    return await fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .catch(err => console.error(err))
  },
  async updateSong(song) {
    return await fetch(baseURL + song._id, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .catch(err => console.error(err))
  },
  async deleteSong(id){
    return await fetch(baseURL + id, {
      method: 'DELETE'
    })
  }
}
