
const bookCards = document.querySelector(".card-holder")
const titleField = document.getElementById("title-form")
const authorField = document.getElementById("author-form")
const pagesField = document.getElementById("pages-form")
const hasReadCheckbox = document.getElementById("read-checkbox")
const submitButton = document.getElementById("submit")

let addOrEditMode = ""
let selectedBookPosition = ""

document.querySelector(".add-button").addEventListener("click", () => { 
    window.open("#add-popup", "_parent")
    addOrEditMode = "ADD"
    clearFormFields()
})

function clearFormFields() {
    titleField.value = ""
    authorField.value = ""
    pagesField.value = ""
}

function setDeleteButtonListener() {
    const buttons = document.querySelectorAll("#delete-image")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", () => {
            myLibrary.splice(index, 1)
            updateBookElementsFromArray()
        })
    })
}

function setEditButtonListener() {
    const buttons = document.querySelectorAll("#edit-image")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", () => {
            window.open("#add-popup", "_parent")
            populateFormWithSelectedBook(index)
            addOrEditMode = "EDIT"
            selectedBookPosition = index
        })
    })
}

function setHasReadButtonListener() {
    const buttons = bookCards.querySelectorAll("button")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", () => {
            myLibrary[index].hasRead = !myLibrary[index].hasRead
            hasReadCheckbox.checked = myLibrary[index].hasRead
            updateBookElementsFromArray()
        })
    })
}

submitButton.addEventListener("click", () => {
    if (checkFormFieldsHaveText()) {
        if (addOrEditMode === "ADD") {
            addBookToArray()
        }
        if (addOrEditMode === "EDIT") {
            editBookFromArray(selectedBookPosition)
        }
        updateBookElementsFromArray()
        dismissPopup()
    }
})

function addBookToArray() {
    myLibrary.push(bookObjectFromForm())
}

function editBookFromArray(position) {
    myLibrary.splice(position, 1, bookObjectFromForm())
}

function bookObjectFromForm() {
    return new Book (
        titleField.value, authorField.value, pagesField.value, hasReadCheckbox.value
    )
}

function checkFormFieldsHaveText() {
    if (titleField.value.length >=2 && authorField.value.length >=2 && pagesField.value.length >= 1) { return true; }
}


function populateFormWithSelectedBook(arrayPosition) {
    titleField.value = myLibrary[arrayPosition].title
    authorField.value = myLibrary[arrayPosition].author
    pagesField.value = myLibrary[arrayPosition].pages
    hasReadCheckbox.value = myLibrary[arrayPosition].hasRead
}

function dismissPopup() { window.location = "#" }

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
        const iconsDiv = document.createElement("div")
    
        titleDiv.classList.add("title")
        authorDiv.classList.add("author")
        pagesDiv.classList.add("pages")
        hasReadDiv.classList.add("hasRead")
        
        titleDiv.innerText = myLibrary[index].title
        authorDiv.innerText = myLibrary[index].author
        pagesDiv.innerText = myLibrary[index].pages + " pages"
    
        const hasReadButton = document.createElement("button")

        let hasReadText = ""
        if (myLibrary[index].hasRead) hasReadText = "Read"; else hasReadText = "Not Read"

        hasReadButton.innerText = hasReadText
        hasReadDiv.appendChild(hasReadButton)

        iconsDiv.classList.add("icons")
        const editElement = document.createElement("img")
        const deleteElement = document.createElement("img")

        editElement.setAttribute("id", "edit-image")
        editElement.src = "./images/pencil.svg"
        editElement.style.width = "25px"
        editElement.style.height = "25px"

        deleteElement.setAttribute("id", "delete-image")
        deleteElement.src = "/images/delete.svg"
        deleteElement.style.width = "25px"
        deleteElement.style.height = "25px"

        iconsDiv.appendChild(deleteElement)
        iconsDiv.appendChild(editElement)
    
        bookDiv.appendChild(titleDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pagesDiv)
        bookDiv.appendChild(hasReadDiv)
        bookDiv.appendChild(iconsDiv)
    
        bookCards.appendChild(bookDiv)        
    })

    setDeleteButtonListener()
    setEditButtonListener()
    setHasReadButtonListener()
}

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
}

// document.addEventListener("click", (e) => {
//     // console.log(document.querySelector(".modal").style.visibility)
//     if (!e.target.closest(".content")) {
//         closePopUp()
//     } 
// })

function closePopUp() {
    const popUp = document.querySelector(".modal")
    popUp.style.display = "none"
}

let myLibrary = [new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true), new Book("No Dogs Go To Hell", "Miff Stabson", "18", true),  new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)]

updateBookElementsFromArray()