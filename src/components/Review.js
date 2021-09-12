class Review {

    constructor(data, movie){
     this.data = data
     this.movie = movie
    }

    renderAllReviews = () => {
        // console.log(this.data.rating, this.star(this.data.rating))
        const stars = this.star(this.data.rating)
        document.querySelector(".cylinder").innerHTML += `
        <div class="box">
       <span><strong>Comment:</strong> ${this.data.content}, <strong>Rating:</strong> ${stars} </span>
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