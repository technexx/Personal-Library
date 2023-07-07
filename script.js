
const bookCards = document.querySelector(".card-holder")

function populateBooks(bookList) {
    for (let i=0; i<Object.keys(bookList).length; i++) {
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book")

        const titleDiv = document.createElement("div")
        const authorDiv = document.createElement("div")
        const pagesDiv = document.createElement("div")
        const hasReadDiv = document.createElement("div")

        titleDiv.classList.add("title")
        authorDiv.classList.add("author")
        pagesDiv.classList.add("pages")
        hasReadDiv.classList.add("hasRead")

        const hasReadButton = document.createElement("button")
        hasReadButton.innerText = bookList[i].hasRead
        hasReadDiv.appendChild(hasReadButton)

        titleDiv.innerText = "\"" + bookList[i].title + "\""
        authorDiv.innerText = bookList[i].author
        pagesDiv.innerText = bookList[i].pages + " pages"

        bookDiv.appendChild(titleDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pagesDiv)
        bookDiv.appendChild(hasReadDiv)
    
        bookCards.appendChild(bookDiv)
    }
}

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead

    if (hasRead) this.hasRead = "Read"; else this.hasRead = "Not Read"

    this.info = function() {
        let userHasRead = ""
        if (hasRead) userHasRead = "has read"; else userHasRead = "not read yet"
        
        return `${title} by ${author}, ${pages} pages, ${userHasRead}`
    }
}

let myLibrary = [new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true), new Book("No Dogs Go To Hell", "Miff Stabson", "18", true),  new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)]

populateBooks(myLibrary)

document.querySelector(".add-button button").addEventListener("click", () => {
    console.log("clicked!")
})

function addPopUp() {

}