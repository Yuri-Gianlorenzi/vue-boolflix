// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Stampiamo tutto a schermo, in questo momento non è importante la parte grafica.
// Bonus:
// Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.

let app = new Vue({
  el : '#app',
  data : {
    query : '',
    apiKey : '1c2bfcf8efd8a513cb5a624bbe643c1b',
    filmSearched : ''
  },//fine data

  mounted() {








  },//fine mounted

  methods : {

    searchMovie() {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params : {
            api_key: this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        })
        .then((result) => {
          // console.log(result.data.results);
          this.filmSearched = result.data.results;
          // console.log(this.filmSearched);
          this.filmSearched.forEach(element => {
            element.vote_star = Math.round(element.vote_average / 2);
          });
        })//fine then
        .catch((error) => alert('errore'));
        console.log(this.filmSearched);

        //for each per le stelle, da problemi




    }//fine searchMovie
    // stelle() {
    //   this.filmSearched = this.filmSearched.map(element => {
    //     return {
    //       ...element,
    //       vote_star:  Math.round(element.vote_average / 2)
    //     }
    //   })
    //
    // }



  }//fine methods
});//fine vue












// API
// https://flynn.boolean.careers/exercises/api/array/music
