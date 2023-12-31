
const login = document.querySelector(".log-in")
const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".content")
const addBook = document.querySelector("#add-image")
const closeBook = document.querySelector(".box-close")

const bookCards = document.querySelector(".card-holder")
const hasReadButton = document.getElementById("has-read-button")
const popupHeader = document.getElementById("form-header")
const titleField = document.getElementById("title-form")
const authorField = document.getElementById("author-form")
const pagesField = document.getElementById("pages-form")
const hasReadCheckbox = document.getElementById("read-checkbox")
const submitButton = document.getElementById("submit")

let addOrEditMode = ""
let selectedBookPosition = ""

// addBook.addEventListener("click", () => { 
//     window.open("#add-popup", "_parent")
//     addOrEditMode = "ADD"
//     popupHeader.innerText = "Add a book!"
//     clearFormFields()
// })

login.addEventListener("click", () => {
    window.open("#", "_parent")
})

closeBook.addEventListener("click", () => {
    window.open("#", "_parent")
})

document.addEventListener("click", (e) => {
    if (e.target.closest("#add-image")) {
        window.open("#add-popup", "_parent")
        addOrEditMode = "ADD"
        popupHeader.innerText = "Add a book!"
        clearFormFields()
    } else if (e.target.closest("#edit-image")) {
        window.open("#add-popup", "_parent")
        addOrEditMode = "EDIT"
        popupHeader.innerText = "Edit your book!"
    } else if (!e.target.closest(".content")) {
        window.open("#", "_parent")
    } 
})

function setEditButtonListener() {
    const buttons = document.querySelectorAll("#edit-image")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", () => {
            populateFormWithSelectedBook(index)
            selectedBookPosition = index
        })
    })
}

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
        titleField.value, authorField.value, pagesField.value, hasReadCheckbox.checked
    )
}

function checkFormFieldsHaveText() {
    if (titleField.value.length >=2 && authorField.value.length >=2 && pagesField.value.length >= 1) { return true; }
}

function populateFormWithSelectedBook(arrayPosition) {
    titleField.value = myLibrary[arrayPosition].title
    authorField.value = myLibrary[arrayPosition].author
    pagesField.value = myLibrary[arrayPosition].pages
    hasReadCheckbox.checked = myLibrary[arrayPosition].hasRead
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
        hasReadButton.setAttribute("id", "has-read-button")
      
        //Elements are not being created until this populates, so we need to change their CSS here.
        let hasReadText = ""
        hasReadButton.style.fontSize = "16px"

        if (myLibrary[index].hasRead) {
            hasReadText = "Read"
            hasReadButton.style.backgroundColor = "#a7f3d0"
       } else {
            hasReadText = "Not Read"
            hasReadButton.style.backgroundColor = "#fecaca"
          }

        hasReadButton.innerText = hasReadText
        hasReadDiv.appendChild(hasReadButton)

        iconsDiv.classList.add("icons")
        const editElement = document.createElement("img")
        const deleteElement = document.createElement("img")

        editElement.setAttribute("id", "edit-image")
        editElement.src = "./images/pencil.svg"
        editElement.style.width = "30px"
        editElement.style.height = "30px"

        deleteElement.setAttribute("id", "delete-image")
        deleteElement.src = "/images/delete.svg"
        deleteElement.style.width = "30px"
        deleteElement.style.height = "30px"

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

let myLibrary = [new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true), new Book("No Dogs Go To Hell", "Miff Stabson", "18", true),  new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)]

updateBookElementsFromArray()