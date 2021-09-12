class Movie {
    

    static all = []
    constructor(data) {
        this.data = data
        this.reviews = this.data.reviews.map(review => new Review(review, this))
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


   static handleSubmit = (e) => {
       
         e.preventDefault()
         const newMovie = {
            title: e.target.title.value,
            summary: e.target.summary.value,
            duration: e.target.duration.value,
            image: e.target.image.value
        }
        api.createMovie(newMovie).then(movie => {
            new Movie
        })
        modal.close()
        e.target.reset()
    }

    static newMovieForm = () => {
        modal.main.innerHTML = `
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
        <div class="cylinder"></div>
        </div>
        <button id="addreview">Add a review</button>
        <button id="goback">Go Back</button>`
        document.getElementById("goback").addEventListener("click", Movie.renderMoviesPage)
        document.getElementById("addreview").addEventListener("click", this.renderReviewForm)
        this.reviews.forEach(review => review.renderAllReviews())
    }

    renderReviewForm = () => {
        modal.main.innerHTML = `
        <form>
        <label for="content">Content:</label><br>
        <input type="text" name="content"><br>
        <label for="rating">Rating:</label><br>
        <input type="number" name="rating" min="1" max="5"><br>
        <input type="submit" value="Add a Review!"<br>
        </form>`

        modal.open()
        document.querySelector("form").addEventListener("submit", this.handleReviewSubmit)
    }

    handleReviewSubmit = (e) => {
       e.preventDefault()
       const newReview = {
           content: e.target.content.value,
           rating: e.target.rating.value
       }
      api.createReview(newReview).then(console.log)
    }

    
}