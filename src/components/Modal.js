class Modal {

    get Modal(){
        return document.querySelector("#myModal")
    }


    open = () => {
     this.Modal.style.display = "block"
    }

    close = () => {
        this.Modal.style.display = "none"
    }
}