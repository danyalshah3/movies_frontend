class Review {

    constructor(data, movie){
        console.log(data, movie)
     this.data = data
     this.movie = movie
    }

    renderAllReviews = () => {
        // console.log(this.data.username)
        const stars = this.star(this.data.rating)
        document.querySelector(".cylinder").innerHTML += `
        <div class="box">
       <br><span><strong>User:</strong> ${this.data.username}, &nbsp; Comment:</strong> ${this.data.content}, &nbsp; <strong>Rating:</strong> ${stars} </span></br>
        </div>
        `
    }



    star = (num) => {
     let str = ""
     for(let i = 1; i <= num; i++){
        str += "⭐"
     }
     return str
    }
}