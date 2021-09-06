class Movie {
    

    static all = []
    constructor(data) {
        this.data = data
        this.constructor.all.push(this)
    
    }

    static getMovies = () => {
        api.getMovies().then(movies => {
            movies.forEach(movie => new Movie(movie))
            this.renderMoviesPage()
        })
    }

    
    
    static renderMoviesPage = () => {
        const list = document.getElementById("list")
        list.innerHTML = ""
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-Container")
        list.appendChild(movieContainer)
        this.all.forEach(movie => movie.renderMovieList())
        movieContainer.addEventListener("click", this.movieClick)
    }
    
    
    
    renderMovieList = () => {
        const { title, summary, image, duration, id } = this.data
        document.querySelector(".movie-Container").innerHTML += `
        <div class="movie-list" data-id=${id}>
        <h1 class="title">${title}</h1>
        <img src="${image}" alt=${name}/>
        </div>`
        
    }
    
    
    static movieClick = (e) => {
        if (e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".movie-list").dataset.id
            this.find(id).renderShowPage()
        }
    }
    
    static find = (id) => this.all.find(movie => movie.data.id == id)
    
    renderShowPage = () => {
        const { title, summary, image, duration, id } = this.data
        document.getElementById("list").innerHTML = `
        <div class="show">
        <h1>${title}</h1>
        <img src="${image}" alt=${name}/>
        <p> ${duration} </p>
        <p> ${summary}</p>
        </div>

        <button id="goback">Go Back</button>`
        document.getElementById("goback").addEventListener("click", Movie.renderMoviesPage)
    }
    
}