import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import "./style.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB-T73nbZMgh0GAF_88TX4PfP3wPlvv9fg",
  authDomain: "library-app-d7e5a.firebaseapp.com",
  projectId: "library-app-d7e5a",
  storageBucket: "library-app-d7e5a.appspot.com",
  messagingSenderId: "1007907423072",
  appId: "1:1007907423072:web:e2ea0dd0542aebd71d9405",
  measurementId: "G-XTD83SEGPC",
});
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

const db = getFirestore(firebaseApp);

const signinButton = document.querySelector("#sign-in");

signinButton.addEventListener("click", async () => {
  await signInWithPopup(auth, provider);
});

async function getBooks(db) {
  const booksCol = collection(db, "books");
  bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => {
    doc.data();
  });
  return bookList;
}

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    libraryDisplay();
  } else {
    console.log("Not logged in");
  }
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.addedToLibrary = false;
  }

  info() {
    return title + " by " + author + ", " + pages + " pages," + read;
  }
  toggleRead() {
    if (this.read === "Yes") {
      this.read = "No";
    } else this.read = "Yes";
  }
  toggleAddedToLibrary() {
    this.addedToLibrary = true;
  }
}

class library {
  constructor(name) {
    this.name = name;
    this.library = [];
  }
  async addBookToLibrary(title, author, pages, read) {
    try {
      const newBook = new Book(title, author, pages, read);
      const pushToCloud = await addDoc(collection(db, "books"), {
        title: title,
        author: author,
        pages: pages,
        read: read,
      });
      console.log("Document written with ID: ", pushToCloud.id);
    } catch (e) {
      console.log(e);
    }
  }

  removeBookFromLibrary(index) {
    this.library.splice(index, 1);
  }
}

const libraryDisplay = () => {
  const form = document.querySelector("form");
  const bookTitle = document.querySelector("#title");
  const bookAuthor = document.querySelector("#author");
  const bookPages = document.querySelector("#pages");
  const bookRead = document.querySelector("#has-read");
  const addBookButton = document.querySelector("#add-book");
  const libraryContainer = document.querySelector(".library");
  const newBook = document.querySelector("#new-book");
  const formWindow = document.querySelector(".popup");
  const returnButton = document.querySelector("#return");
  const myLibrary = new library("myLibrary");

  addBookButton.addEventListener("click", () => {
    addBook();
  });

  newBook.addEventListener("click", () => {
    formWindow.classList.toggle("visible");
  });
  returnButton.addEventListener("click", () => {
    formWindow.classList.toggle("visible");
    form.reset();
  });

  const checkFormValidity = () => {
    bookTitle.checkValidity();
    bookTitle.setCustomValidity("");

    if (!bookTitle.validity.valid) {
      bookTitle.setCustomValidity("Book Title Required");
      bookTitle.reportValidity();
      return false;
    }
    bookAuthor.checkValidity();
    bookAuthor.setCustomValidity("");
    if (!bookAuthor.validity.valid) {
      bookAuthor.setCustomValidity("Book Author Required");
      bookAuthor.reportValidity();
      return false;
    }

    bookPages.checkValidity();
    bookPages.setCustomValidity("");
    if (!bookPages.validity.valid) {
      bookPages.setCustomValidity("Number of pages required");
      bookPages.reportValidity();
      return false;
    } else return true;
  };

  const addBook = () => {
    let read;
    if (checkFormValidity()) {
      if (bookRead.checked) {
        read = true;
      } else read = false;
      myLibrary.addBookToLibrary(
        `${bookTitle.value}`,
        `${bookAuthor.value}`,
        `${bookPages.value}`,
        read
      );
      updateLibary();
      formWindow.classList.toggle("visible");
      form.reset();
    }
  };

  const updateLibary = async () => {
    const bookQuery = query(collection(db, "books"));
    const querySnapshot = await getDocs(bookQuery);
    libraryContainer.innerHTML = "";
    querySnapshot.forEach((fireDoc) => {
      const data = fireDoc.data();
      const docPath = fireDoc.ref.path;
      const docRef = doc(db, docPath);
      const { author, pages, title, read } = data;
      let bookContainer = document.createElement("div");
      bookContainer.classList.add("book");
      let placeBookTitle = document.createElement("h2");
      let placeAuthor = document.createElement("p");
      let placePages = document.createElement("p");
      let placeRead = document.createElement("p");
      let removeButton = document.createElement("span");
      let readButton = document.createElement("div");
      let bookSection1 = document.createElement("div");
      let bookSection2 = document.createElement("div");
      let bookSection3 = document.createElement("div");
      let bookSection4 = document.createElement("div");
      let bookSection5 = document.createElement("div");
      bookSection1.classList.add("section");
      bookSection2.classList.add("section");
      bookSection3.classList.add("section");
      bookSection4.classList.add("section");
      bookSection5.classList.add("section");
      bookContainer.appendChild(bookSection1);
      bookSection1.appendChild(placeBookTitle);
      bookContainer.appendChild(bookSection2);
      bookSection2.appendChild(placeAuthor);
      bookContainer.appendChild(bookSection3);
      bookSection3.appendChild(placePages);
      bookContainer.appendChild(bookSection4);
      bookSection4.appendChild(placeRead);
      bookContainer.appendChild(bookSection5);
      bookSection5.appendChild(removeButton);
      bookSection5.appendChild(readButton);

      if (read) {
        bookContainer.classList.add("read");
      } else if (!read) {
        bookContainer.classList.remove("read");
      }

      placeBookTitle.textContent = `Title: ${title}`;
      placeAuthor.textContent = `Author: ${author}`;
      placePages.textContent = `Pages: ${pages}`;
      if (read) {
        placeRead.textContent = `Read: Yes`;
      } else {
        placeRead.textContent = `Read: No`;
      }

      removeButton.classList.add("material-icons-outlined");
      removeButton.textContent = "delete";
      readButton.classList.add("material-icons-outlined");
      readButton.textContent = "auto_stories";

      libraryContainer.appendChild(bookContainer);

      // bookContainer.index = myLibrary.library.indexOf(book);

      removeButton.addEventListener("click", async () => {
        await deleteDoc(docRef);
        updateLibary();
      });

      readButton.addEventListener("click", async () => {
        await setDoc(docRef, {
          title: title,
          author: author,
          pages: pages,
          read: !read,
        }).then((response) => {
          updateLibary();
        });
        // book.toggleRead();
      });
    });
  };
  updateLibary();
};
