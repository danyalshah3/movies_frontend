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
        const addMovie = document.createElement("button")
        addMovie.innerText = "Add a new Movie"
        addMovie.addEventListener("click", this.newMovieForm)
        list.append(movieContainer, addMovie)
        this.all.forEach(movie => movie.renderMovieList())
        movieContainer.addEventListener("click", this.movieClick)
    }

    static newMovieForm() {
        modal.main.innerHTML += `
        <form>
        <label for="title">Title:</label><br>
        <input type="text" name="title"><br>
        <label for="summary">Summary:</label><br>
        <input type="text" name="summary"><br>
        <label for="image">Image:</label><br>
        <input type="text" name="image"><br>
        <label for="duration">Duration:</label><br>
        <input type="text" name="duration"><br>
        <input type="submit" value="Add a Movie!"<br>
         </form>
         `
         modal.main.querySelector("form").addEventListener("submit", this.handleSubmit)
         modal.open()
    }
    
    static handleSubmit = (e) => {
        e.preventDefualt()
        const newMovie = {
            title: e.target.title.value,
            summary: e.target.summary.value,
            duration: e.target.duration.value,
            image: e.target.image.value
        }
        console.log(newMovie)
    }
    
    renderMovieList = () => {
        const { title, summary, image, duration, id } = this.data
        document.querySelector(".movie-Container").innerHTML += `
        <div class="movie-list" data-id=${id}>
        <h1 class="title">${title}</h1>
        <img src="${image}" alt=${name}/>
        </div>`
        
    }
    
    static find = (id) => this.all.find(movie => movie.data.id == id)
    
    static movieClick = (e) => {
        if (e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".movie-list").dataset.id
            this.find(id).renderShowPage()
        }
    }
    
    
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