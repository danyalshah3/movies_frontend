const api = new ApiService("http://localhost:3000")
const modal = new Modal()


// Movie.getMovies()

document.querySelector("form").addEventListener("submit", handleUsernameSubmit)

function handleUsernameSubmit(e) {
    e.preventDefault()
    const newUser = {
        username: e.target.username.value 
    }
    api.findOrCreateUser(username).then(console.lo)
}
