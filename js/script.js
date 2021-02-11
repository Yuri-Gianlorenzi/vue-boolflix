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
    filmSearched : '',
    whatLenguage : '',
  },//fine data

  mounted() {








  },//fine mounted

  methods : {

    searchGlobal() {

      //WARINIG CHIAMATA SU MOVIE
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params : {
            api_key: this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        })
        .then((result) => {
          console.log(result.data.page);
          this.filmSearched = result.data.results;
          console.log(this.filmSearched);

          //il foreach al di fuori del then fa si che non venga letto dall'html l'aggiunta del vote_star,non facendo dunque funzionare il v-for delle stelle. dentro il then aggiungiamo all'oggetto della richiesta una key che arrotonda il voto medio e proporziona ad una scala dove 5 è il massimo
          this.filmSearched.forEach(element => {
            element.vote_star = Math.round(element.vote_average / 2);
          });


        })//fine then chiamata movie
        .catch((error) => alert('errore'));





      //WARINIG CHIAMATA SU MOVIE
      axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params : {
            api_key: this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        })
        .then((result) => {
          console.log(result.data.page);
          let tvSearched = '';
          tvSearched = result.data.results;
          console.log(tvSearched);

          //oltre al forEhach per la key delle stelle, pushamo ogni elemento dell'array diversamente da sopra, prove per far si che vada sempre a buon fine, attualmente a volte stampa solo film al primo enter-press e ad un altro press anche le serie, a volte va e a volte no 
          tvSearched.forEach(element => {
            element.vote_star = Math.round(element.vote_average / 2);
            this.filmSearched.push(element);
          });


        })//fine then chiamata movie
        .catch((error) => alert('errore'));



    }//fine searchGlobal




  }//fine methods
});//fine vue











//non ha funzionato per fare le stelle
// stelle() {
//   this.filmSearched = this.filmSearched.map(element => {
//     return {
//       ...element,
//       vote_star:  Math.round(element.vote_average / 2)
//     }
//   })
//
// }






// API
// https://flynn.boolean.careers/exercises/api/array/music
