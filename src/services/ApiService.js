class ApiService {

    constructor(api) {
        this.api = api
    }

    getMovies = () => fetch(this.api + "/movies").then(resp => resp.json())


    createMovie = (newMovie) => fetch(this.api + "/movies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      }).then(response => response.json())
    
    
      createReview = (newReview) => fetch(this.api + "/reviews", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      }).then(response => response.json())
}