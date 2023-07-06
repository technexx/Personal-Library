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

const book = new Book("blah", "dumb author", "555", true)

console.log(book.info())