class Book {
    constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.addedToLibrary = false;
    }
    
    info() {
        return title + " by " + author + ", " + pages + " pages," + read;
    }
    toggleRead() {
        if (this.read === "Yes") {
            this.read = "No"
        }

        else this.read = "Yes";
    }
    toggleAddedToLibrary() {
        this.addedToLibrary = true;
    }
}

class library {
constructor(name) {
    this.name = name;
    this.library = []
}
addBookToLibrary(title, author, pages, read) {
        this.library.push(new Book(title, author, pages,read)); 
    }

removeBookFromLibrary(index) {
    this.library.splice(index, 1);
}
}

const libraryDisplay = (() => {
    const form = document.querySelector("form");
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookRead = document.querySelector("#has-read")
    const addBookButton = document.querySelector("#add-book");
    const libraryContainer = document.querySelector('.library');
    const newBook = document.querySelector('#new-book');
    const formWindow = document.querySelector('.popup');
    const returnButton = document.querySelector('#return');
    const myLibrary = new library('myLibrary');

        addBookButton.addEventListener("click", () => {
       addBook(bookTitle, bookAuthor, bookPages, bookRead);
        updateLibary();
        formWindow.classList.toggle('visible');
        form.reset();
        })

        newBook.addEventListener('click', () => {
            formWindow.classList.toggle('visible');
        })
        returnButton.addEventListener('click', () => {
            formWindow.classList.toggle('visible');
        });

    const addBook = () => {
        if (bookTitle.value.length < 1 || bookAuthor.value.length < 1) {
            alert('Missing fields');
            return
        }
    
        else if (bookPages.value < 1 || bookPages.value === "") {
            alert("Book length must be longer than 1");
            return
        }
    
        else {
            if (bookRead.checked) {
                read = "Yes"
            }
            else read = "No"
            myLibrary.addBookToLibrary(`${bookTitle.value}`, `${bookAuthor.value}`, `${bookPages.value}`, read);
            // updateLibary();
            // formWindow.classList.toggle('visible');
            // form.reset();
        }
    }

    const updateLibary = () => {
        myLibrary.library.forEach(book => {
            if (book.addedToLibrary == true) {
                return;
            } //prevents the same book from being added more than once
    
            else {
                let bookContainer = document.createElement('div');
                bookContainer.classList.add('book');
                let placeBookTitle = document.createElement('h2');
                let placeAuthor = document.createElement('p');
                let placePages = document.createElement('p');
                let placeRead = document.createElement('p');
                let removeButton = document.createElement('span')
                let readButton = document.createElement('div')
                let bookSection1 = document.createElement('div');
                let bookSection2 = document.createElement('div');
                let bookSection3 = document.createElement('div');
                let bookSection4 = document.createElement('div');
                let bookSection5 = document.createElement('div');
                bookSection1.classList.add('section');
                bookSection2.classList.add('section');
                bookSection3.classList.add('section');
                bookSection4.classList.add('section');
                bookSection5.classList.add('section'); 
                bookContainer.appendChild(bookSection1);
                bookSection1.appendChild(placeBookTitle);
                bookContainer.appendChild(bookSection2)
                bookSection2.appendChild(placeAuthor);
                bookContainer.appendChild(bookSection3);
                bookSection3.appendChild(placePages);
                bookContainer.appendChild(bookSection4);
                bookSection4.appendChild(placeRead);
                bookContainer.appendChild(bookSection5);
                bookSection5.appendChild(removeButton);
                bookSection5.appendChild(readButton);
    
    
                if (book.read === "Yes") {
                    bookContainer.classList.add('read');
                }
    
                placeBookTitle.textContent = `Title: ${book.title}`;
                placeAuthor.textContent = `Author: ${book.author}`;
                placePages.textContent = `Pages: ${book.pages}`;
                placeRead.textContent = `Read: ${book.read}`;
    
    
                removeButton.classList.add('material-icons-outlined');
                removeButton.textContent = 'delete';
                readButton.classList.add('material-icons-outlined');
                readButton.textContent = 'auto_stories';
    
    
                libraryContainer.appendChild(bookContainer);
    
                book.toggleAddedToLibrary();
                bookContainer.index = myLibrary.library.indexOf(book);
    

                removeButton.addEventListener('click', () => {
                    myLibrary.removeBookFromLibrary(bookContainer.index);
                    libraryContainer.removeChild(bookContainer);
                    updateLibary();
                })
    
    
                readButton.addEventListener('click', () => {
                    book.toggleRead();
                    placeRead.textContent = `Read: ${book.read}`;
                    bookContainer.classList.toggle('read');
                })
            }
        })
    }
})();







// myLibrary.push(new Book("Moby Dick", "Herman Melville", "427", "No"));
// updateLibary();




