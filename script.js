let myLibrary = []

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

const testBookOne = new Book("A Tale of Two Tattle Tales", "Zac Caz", "666", true)
const testBookTwo = new Book("No Dogs Go To Hell", "Miff Stabson", "18", true)
const testBookThree = new Book("How Can It Be When It Ain't So?", "Railyard Chechnya", "1502", false)

let bookList = [{testBookOne}, {testBookTwo}, {testBookThree}]

console.log(bookList)