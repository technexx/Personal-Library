const bookCards = document.querySelector(".card-holder")
const titleField = document.getElementById("title-form")
const authorField = document.getElementById("author-form")
const pagesField = document.getElementById("pages-form")
const hadReadCheckbox = document.getElementById("read-checkbox")
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", () => {
    if (checkFormFieldsHaveText()) {
        addBookToArray(bookObjectFromForm())
        updateBookElementsFromArray()
        dismissPopup()
        clearFormFields()
    }
})

function checkFormFieldsHaveText() {
    if (titleField.value.length >=2 && authorField.value.length >=2 && pagesField.value.length >= 1) { return true; }
}

function dismissPopup() { window.location = "#" }

function clearFormFields() {
    titleField.value = ""
    authorField.value = ""
    pagesField.value = ""
}

function addBookToArray() {
    myLibrary.push(bookObjectFromForm())
}

function bookObjectFromForm() {
    return new Book (
        titleField.value, authorField.value, pagesField.value, hadReadCheckbox.value
    )
}

function updateBookElementsFromArray() {
    const booksInDom = document.querySelectorAll(".book")
    booksInDom.forEach(book => {
        book.remove()
    })
    
    myLibrary.forEach(function callback(value, index) {
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book")
    
        const titleDiv = document.createElement("div")
        const authorDiv = document.createElement("div")
        const pagesDiv = document.createElement("div")
        const hasReadDiv = document.createElement("div")
        const editElement = document.createElement("img")
    
        titleDiv.classList.add("title")
        authorDiv.classList.add("author")
        pagesDiv.classList.add("pages")
        hasReadDiv.classList.add("hasRead")
        editElement.setAttribute("id", "edit-image")
        
        titleDiv.innerText = myLibrary[index].title
        authorDiv.innerText = myLibrary[index].author
        pagesDiv.innerText = myLibrary[index].pages + " pages"
        editElement.src = "./images/pencil.svg"
        editElement.style.width = "25px"
        editElement.style.height = "25px"
    
        const hasReadButton = document.createElement("button")
        hasReadButton.innerText = myLibrary[index].hasRead
        hasReadDiv.appendChild(hasReadButton)
    
        bookDiv.appendChild(editElement)
        bookDiv.appendChild(titleDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pagesDiv)
        bookDiv.appendChild(hasReadDiv)
    
        bookCards.appendChild(bookDiv)        

        const editImage = document.getElementById("edit-image")
        editImage.addEventListener("click", () => {
        })
    })

    setEditButtonListeners()
}

function setEditButtonListeners() {
    const buttons = document.querySelectorAll("#edit-image")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", () => {
            window.open("#add-popup", "_parent")
            populateFormWithSelectedBook(index)
        })
    })
}

function populateFormWithSelectedBook(arrayPosition) {
    titleField.value = myLibrary[arrayPosition].title
    authorField.value = myLibrary[arrayPosition].author
    pagesField.value = myLibrary[arrayPosition].pages
    hadReadCheckbox.value = myLibrary[arrayPosition].hasRead
}

function deleteBookFromLibrary() {

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

updateBookElementsFromArray()