class Movie {
    

    static all = []
    constructor(data) {
        this.data = data
        this.reviews = this.data.reviews.map(review => new Review(review, this))
        this.constructor.all.push(this)
    
    }

    static getMovies = () => {
        api.getMovies().then(movies => {
            // Movie.all = []
            movies.forEach(movie => {
                new Movie(movie)})
            this.renderMoviesPage()
        })
    }

    static getReviews = () => {
        api.getReviews().then(reviews => {
            reviews.forEach(review => {
                new Review(review)
            })
            this.renderReview()
        })
    }

    
    
       static renderMoviesPage = () => {
           const list = document.getElementById("list")
           list.innerHTML = ""
           document.querySelector(".newUser").innerHTML = ""
           const movieContainer = document.createElement("div")
           movieContainer.id = "movie-container"
           movieContainer.classList.add("cylinder")
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
           let c = new Movie(movie)
           c.renderMovieList()
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
        <input type="submit" value="Add a Movie!"><br>
         </form>
         `
         modal.main.querySelector("form").addEventListener("submit", this.handleSubmit)
         modal.open()
    }
    
    
    renderMovieList = () => {
        const { title, summary, image, duration, id } = this.data
        document.getElementById("movie-container").innerHTML += `
        <div class="movie-list" data-id=${id}>
        <h1 class="title">${title}</h1>
        <img src="${image}" alt=${name}/>
        <p class="number-of-reviews">Total Reviews: ${this.reviews.length}</p>
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
        const { title, summary, image, duration } = this.data
        const list = document.getElementById("list")
        list.innerHTML = `
        <div class="show">
        <h1>${title}</h1>
        <img src="${image}" alt=${name}/>
        <p> ${duration} </p>
        <p> ${summary}</p>
        <div class="cylinder"></div>
        </div><br>
        <button id="addreview">Add a review</button><br>
        <button id="goback">Go Back</button>`
        
        document.getElementById("addreview").addEventListener("click", this.renderReviewForm)
        document.getElementById("goback").addEventListener("click", Movie.renderMoviesPage)
        this.reviews.forEach(review => review.renderReview())
       
       
        // api.getReviews().then(reviews => {
        //     reviews.forEach(review => {
        //         new Review(review)
        //     })
        //     this.renderReview()
        // })

    }


    

    renderReviewForm = () => {
        modal.main.innerHTML = `
        <form>
        <label for="content">Content:</label><br>
        <input type="text" name="content"><br>
        <label for="rating">Rating:</label><br>
        <input type="number" name="rating" min="1" max="5"><br>
        <input type="submit" value="Add a Review!"><br>
        </form>`

        // let obj = {}
        // console.log(this.data.reviews.push())
        document.querySelector("form").addEventListener("submit", this.handleReviewSubmit)
        modal.open()
    }

    
    handleReviewSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            content: e.target.content.value,
            rating: e.target.rating.value,
            movie_id: this.data.id
        }
        api.createReview(newReview).then(review => {
            new Review(review).renderReview()
            //  console.log(review)
        })
        //    console.log(newReview)
        this.reviews.push(newReview)
       modal.close()
       e.target.reset()
       
   
     }
}