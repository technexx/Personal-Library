
//Todo: (a)refresh DOM from array each time list is modified or (b)insert elements directly and keep mirror array or (c)insert elements directly and if needed populate an array by querying them.

const bookCards = document.querySelector(".card-holder")
const titleField = document.getElementById("title-form")
const authorField = document.getElementById("author-form")
const pagesField = document.getElementById("pages-form")
const hadReadCheckbox = document.getElementById("read-checkbox")
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", () => {
    
    if (checkFormFieldsHaveText()) {
        addBookToLibrary(bookObjectFromForm())
        dismissPopup()
    }
})

function checkFormFieldsHaveText() {
    // console.log(titleField.value)
    // console.log(authorField.value)
    // console.log(pagesField.value)

    if (titleField.value.length >=2 && authorField.value.length >=2 && pagesField.value.length >= 1) { return true; }
}

function dismissPopup() { window.location = "#" }

function addBookToLibrary(bookObject) {
    console.log("book object is " + bookObject)
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
    
    titleDiv.innerText = bookObject.title
    authorDiv.innerText = bookObject.author
    pagesDiv.innerText = bookObject.pages + " pages"

    const hasReadButton = document.createElement("button")
    hasReadButton.innerText = bookObject.hasRead
    hasReadDiv.appendChild(hasReadButton)

    bookDiv.appendChild(titleDiv)
    bookDiv.appendChild(authorDiv)
    bookDiv.appendChild(pagesDiv)
    bookDiv.appendChild(hasReadDiv)

    bookCards.appendChild(bookDiv)
}

function bookObjectFromForm() {
    return new Book (
        titleField.value, authorField.value, pagesField.value, hadReadCheckbox.value
    )
}

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead

    if (hasRead) this.hasRead = "Read"; else this.hasRead = "Not Read"

    this.info = function() {
        let userHasRead = ""
        if (hasRead) userHasRead = "has read"; else userHasRead = " not read yet"
        
        return `${title} by ${author}, ${pages} pages, ${userHasRead}`
    }
}

///////////////////////////////////////////////////////////

let myLibrary = [new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true), new Book("No Dogs Go To Hell", "Miff Stabson", "18", true),  new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)]

// populateBooks(myLibrary)