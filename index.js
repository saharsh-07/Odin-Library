//global variables
const errorTxt = document.getElementById("error");
const addBtn = document.querySelector("button[type='button']");
const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const bookName = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPagesCount = document.getElementById("book-pages");
const checkmarks = document.querySelectorAll("input[type = 'checkbox'");
const bookStatus = document.getElementById("book-read");
let myLibrary = [];

//Book object creater
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = read === "yes" ? true : false;
  this.info = () => {
    return `${this.title} by ${this.author}, (${this.pages}) pages, ${
      this.read ? "read." : "not read yet."
    }`;
  };
}

//remove book from library
const remove = (book) => {
  myLibrary = myLibrary.filter((tmp) => tmp.title !== book);
  return renderLibrary();
};

//toggle read checkbox
const toggleRead = (title) => {
  const item = myLibrary.findIndex((tmp) => tmp.title === title);
  myLibrary[item].read = !myLibrary[item].read;
  return renderLibrary();
};

//creates and adds book to library and calls rendering of book on dom
function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  renderLibrary();
}

function renderLibrary() {
  container.replaceChildren();
  if (myLibrary.length > 0) {
    {
      for (i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        card.className = "cards";
        container.appendChild(card);
        renderBook(
          myLibrary[i].title,
          myLibrary[i].author,
          myLibrary[i].pages,
          myLibrary[i].read,
          card
        );
      }
    }
  } else {
    errorTxt.classList.remove("hidden");
    errorTxt.textContent = "Please Add A Book to See !";
    magic();
  }
}

//default book render
const firstbook = {
  title: "Lord of the Rings",
  author: "J. R. R. Tolkien",
  pages: "1137",
  read: "yes",
};

/*render in container books from myLibrary array
 , #USED INNERHTML BCOZ DONT KNOW OTHER WAY OF */
function renderBook(title, author, pages, read, e) {
  e.innerHTML = `
          <h2>
            Title :
            <span>${title}</span>
          
        <span id="remove" data-title="${title}" onclick="remove(
    this.dataset.title)" class="remove">&times;</span>   
        </h2>
          <h2>
            Author :
            <span>${author}</span>
          </h2>
          <h2/h2>
            Pages :
            <span>${pages}</span>
          </h2>
          <h2/h2>Read : <input data-read="${title}" onclick="toggleRead(
            this.dataset.read)" type="checkbox" ${
              read ? "checked" : ""
            } name="read" id="read" /></h2>`;
}

//bunch of event listeners
addBtn.addEventListener("click", () => {
  dialog.style.display = "block";
  container.classList.add("blur");
  bookName.focus();
  dialog.style.zIndex = 1;
});

document.querySelector(".close").addEventListener("click", () => {
  container.classList.remove("blur");
  dialog.style.display = "none";
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    dialog.style.display = "none";
    container.classList.remove("blur");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(
    bookName.value,
    bookAuthor.value,
    bookPagesCount.value,
    bookStatus.value
  );
  form.reset();
  dialog.style.display = "none";
  container.classList.remove("blur");
});

const magic = () => setTimeout(() => {
  errorTxt.classList.add("hidden")
}, 4000);

window.onload = () => {
  magic();
  addBookToLibrary(
    firstbook.title,
    firstbook.author,
    firstbook.pages,
    firstbook.read
  );
};
