
let app = new Vue({
  el : '#app',
  data : {
    query : '',
    apiKey : '1c2bfcf8efd8a513cb5a624bbe643c1b',
    whatSelect : ['Home', 'Film', 'Serie Tv', 'Lista Preferiti','Generi'],
    indexSelected : '',
    filmSaved : [],
    filmSearched : '',
    tvSearch : '',
    all : '',
    allTypes : '',
    allFiltered : [],
    allNotFiltered : '',
    openGenre : false,
    typeSelected : ''
  },//fine data

  mounted() {


      //per prendere tutti i generi e relativi id dall'api
      axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params : {
          api_key: this.apiKey,
          language : 'it-IT'
        }
      })
      .then((result) => {
        // console.log(result.data.genres);
        this.allTypes = result.data.genres;
        // console.log(this.allTypes);
      })//fine then










  },//fine mounted

  methods : {
    //per far partire la funzione searchGlobal amche al click dell'icona-lente
    clickSearchGlobal () {this.searchGlobal()},

    searchGlobal() {

      //WARINIG CHIAMATA SU MOVIE INSERITA IN UNA VARIABILE
      let chiamataFilm = axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params : {
            api_key: this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        });

        //WARNING CHIAMATA SU TV INSERITA IN UNA VARIABILE
      let chiamataSerie = axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params : {
            api_key: this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        });

        //CON QUESTO COMANDO LAVORIAMO CONTEMOTANEAMENTE SULLE 2 CHIAMATE: il metodo axios.all() permette di processare 2 richieste contemoraneamente, come argomento accetta un array, nel nostro caso inseriamo le 2 variabili precedenti in un array.
        //Il metodo axios.all accetta un array come parametro. Ogni elemento dell'array è una richiesta e restituisce un oggetto promise. Quando tutte le richieste nell'array sono state completate, viene eseguito il metodo then.
        // Il metodo axios.spread viene eseguito nel metodo then. Il metodo consiste nel ricevere una funzione come parametro e restituire una nuova funzione. Il parametro della funzione parametro ricevuta è la risposta restituita da ogni richiesta nel metodo axios.all.
        axios.all([chiamataFilm, chiamataSerie])
        .then(axios.spread((result,show) => {
          //result è la variabile per la chiamata MOVIE
          //show è la variabile per la chiamata SERIE TV
          // console.log(result.data.page);
          this.filmSearched = result.data.results;
          // console.log(this.filmSearched);

          this.tvSearch = show.data.results;
          // console.log(this.tvSearch);



          //il foreach al di fuori del then fa si che non venga letto dall'html l'aggiunta del vote_star,non facendo dunque funzionare il v-for delle stelle. dentro il then aggiungiamo all'oggetto della richiesta una key che arrotonda il voto medio e proporziona ad una scala dove 5 è il massimo
          this.filmSearched.forEach(element => {
            element.vote_star = Math.round(element.vote_average / 2);
          });

          console.log(show.data.page);
          // console.log(tvSearched);

          //forEhach per la key delle stelle
          this.tvSearch.forEach(element => {
            element.vote_star = Math.round(element.vote_average / 2);
          });

          this.all = [...this.filmSearched,...this.tvSearch];


        }))//fine then chiamata movie
        .catch((error) => alert(error));


    },//fine searchGlobal

    saveFilm(film) {
      if (!this.filmSaved.includes(film)) {
        this.filmSaved.push(film);
        // console.log(this.filmSaved);

      }
    },//fine filmSaved

    showWhat(index) {
      this.indexSelected = index;



      switch (index) {

        case 0:
        this.openGenre = false;
        this.all = [...this.filmSearched,...this.tvSearch];
        break;

        case 1:
        this.openGenre = false;
        this.all = [...this.filmSearched];
        break;

        case 2:
        this.openGenre = false;
        this.all = this.all = [...this.tvSearch];
        break;

        case 3:
        this.openGenre = false;
        this.all = [...this.filmSaved];
        break;

        case 4:
        if (!this.openGenre) {
          this.openGenre = true;
        } else {
          this.openGenre = false;
        }
        break;

      }//fine switch




    },//fine changeSelected

    genreSelected (indexType) {

      //fer assegnare la classe clicked
      this.typeSelected = indexType;
      console.log(this.typeSelected);
      this.openGenre = false;

      this.allFiltered = [];

      if (this.allNotFiltered) {
        this.all = this.allNotFiltered;
        console.log(this.all);
      } else {
        this.allNotFiltered = this.all;
        console.log(this.allNotFiltered);
      };

      this.all.forEach(element => {

        if (element.genre_ids.includes(this.allTypes[indexType].id)) {
          this.allFiltered.push(element);
        }


      });//foreach

      this.all = this.allFiltered;
    }






  }//fine methods
});//fine vue



























// if (index == 0) {
//   // this.all = '';
//   console.log(this.all);
//   this.all = [...this.filmSearched,...this.tvSearch];
// };
//
// if (index == 1) {
//   // this.all = '';
//   console.log(this.all);
//   this.all = [...this.filmSearched];
// };
//
// if (index == 2) {
//   // this.all = '';
//   console.log(this.all);
//   this.all = [...this.tvSearch];
// };
//
// if (index == 3) {
//
//   this.all = [...this.filmSaved];
//
// }// if click lista preferiti
