class ApiService {

    constructor(api) {
        this.api = api
    }

    getMovies = () => fetch(this.api + "/movies").then(resp => resp.json())
}