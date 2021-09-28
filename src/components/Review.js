class Review {

    constructor(data, movie){
        // console.log(data, movie)
     this.data = data
     this.movie = movie
    }

   renderReview = () => {
        // console.log(this.data.username)
        const stars = this.star(this.data.rating)
        document.querySelector(".cylinder").innerHTML += `
        <div class="box" data-id=${this.data.id}>
        <br><span><strong>User:</strong> ${this.data.username}, &nbsp; Comment:</strong> ${this.data.content}, &nbsp; <strong>Rating:</strong> ${stars} </span>
        <button class="delete-button">Delete Review</button></br>
        </div>
        `
        
        
        // console.log(this.data.id)
        document.querySelector(".cylinder").addEventListener("click", this.handleClick)
    }


    handleClick = (e) => {
        if (e.target.classList.contains("delete-button")){
            const box = e.target.closest(".box")
        //  console.log(e.target.closest(".cylinder"))
            const id = box.dataset.id
            // console.log(box.dataset.id)
           {
                fetch("http://localhost:3000" + `/reviews/${id}`, {method: "DELETE"})
                .then(res => res.json())
                .then(() => box.remove())
            }
          
        }
        
    }

    


    star = (num) => {
     let str = ""
     for(let i = 1; i <= num; i++){
        str += "⭐"
     }
     return str
    }
}