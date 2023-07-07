
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

        titleDiv.innerText = bookList[i].title
        authorDiv.innerText = bookList[i].author
        pagesDiv.innerText = bookList[i].pages
        hasReadDiv.innerText = bookList[i].hasRead

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

    this.info = function() {
        let userHasRead = ""
        if (hasRead) userHasRead = "has read"; else userHasRead = "not read yet"
        
        return `${title} by ${author}, ${pages} pages, ${userHasRead}` 
    }
}

let myLibrary = [new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true), new Book("No Dogs Go To Hell", "Miff Stabson", "18", true),  new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)]

populateBooks(myLibrary)

// const testBookOne = new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true)
// const testBookTwo = new Book("No Dogs Go To Hell", "Miff Stabson", "18", true)
// const testBookThree = new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)

// myLibrary.forEach(book => {
//     //Todo: Create DOM elements
// })