const form = document.querySelector("form");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#has-read")
const notRead = document.querySelector('#not-read');
const addBookButton = document.querySelector("#add-book");
const library = document.querySelector('.library');
const newBook = document.querySelector('#new-book');
const formWindow = document.querySelector('.popup');
const returnButton = document.querySelector('#return');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
       return title + " by " + author + ", " + pages + " pages," + read;
    }
}


function addBookToLibrary() {
   
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

    myLibrary.push(new Book(`${bookTitle.value}`, `${bookAuthor.value}`, `${bookPages.value}`, read));
    updateLibary();
    formWindow.classList.toggle('visible');
    form.reset();
}
}

addBookButton.addEventListener("click",addBookToLibrary);

newBook.addEventListener('click', () => {
    formWindow.classList.toggle('visible');
})



function updateLibary() {
    myLibrary.forEach(book => {
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
        if (book.read === "Yes") {
            readButton.textContent = 'auto_stories';
        }

        else readButton.textContent = 'clear';

        library.appendChild(bookContainer);

        book.addedToLibrary = true;
        bookContainer.index = myLibrary.indexOf(book);

        removeButton.addEventListener('click', () => {
            myLibrary.splice(bookContainer.index, 1);
            library.removeChild(bookContainer);
        })

        readButton.addEventListener('click', () => {
            if (book.read === 'No') {
                book.read = "Yes";
                placeRead.textContent = "Read: Yes"
                readButton.textContent = 'auto_stories';
                bookContainer.classList.add('read');
            }

            else if (book.read ==='Yes') {
                book.read = "No";
                placeRead.textContent = "Read: No"
                readButton.textContent = 'clear';
                bookContainer.classList.remove('read');
            }
        })
    }

})
}

returnButton.addEventListener('click', () => {
    formWindow.classList.toggle('visible');
});

myLibrary.push(new Book("Moby Dick", "Herman Melville", "427", "No"));
updateLibary();




