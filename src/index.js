const api = new ApiService("http://localhost:3000")
const modal = new Modal()

let user
// Movie.getMovies()

 document.querySelector("form").addEventListener("submit", handleUsernameSubmit)


function handleUsernameSubmit(e) {
    e.preventDefault()
    document.getElementById("list").innerHTML = ""
    api.findOrCreateUser(e.target.username.value).then(userData => {
        user = userData
        Movie.getMovies()
    })
}

// function validateForm() {
//     let x = document.forms["myForm"]["username"].value;
//     if (x == "") {
//       alert("Name must be filled out");
//       return false;
//     }
//   }
