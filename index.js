//global variables
const addBtn = document.querySelector("button[type='button']");
const container = document.querySelector(".container");



const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = (read === "yes") ? true : false;
    this.info = () => {
    return(`${this.title} by ${this.author}, (${this.pages}) pages, ${this.read ? "read."  :"not read yet."}`);  
  }
};


function addBookToLibrary(title,author,pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  let card = document.createElement("div");
  card.className = "cards";
  container.appendChild(card);
  let res = ""
  myLibrary.forEach(element => {
    ({title, author, pages, read} = element);
    res = `${title} ${author} ${pages} ${read}`
  });
  card.textContent = res
};

addBtn.addEventListener("click", () => addBookToLibrary("heck", "sexy", "69", "yes"));
