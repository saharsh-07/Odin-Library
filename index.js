//global variables
const addBtn = document.querySelector("button[type='button']");
const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const bookName = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPagesCount = document.getElementById("book-pages");
const bookStatus = document.getElementById("book-read");
const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  let card = document.createElement("div");
  card.className = "cards";
  container.appendChild(card);
  for (i = 0; i < myLibrary.length; i++) {
    renderBook(
      myLibrary[i].title,
      myLibrary[i].author,
      myLibrary[i].pages,
      myLibrary[i].read,
      card
    );
  }
}

function renderBook(title, author, pages, read, e) {
  e.innerHTML = `
          <h2>
            Title :
            <span>${title}</span>
          </h2>
          <h2>
            Author :
            <span>${author}</span>
          </h2>
          <h2/h2>
            Pages :
            <span>${pages}</span>
          </h2>
          <h2/h2>Read : <input type="checkbox" ${
            read ? "checked" : ""
          } name="read" id="read" /></h2>
        

`;
}

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
