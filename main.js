const myLibrary = [];

const container = document.getElementById("container");
const indexPage = document.getElementById("index");
const newPage = document.getElementById("new");
const newButton = document.getElementById("new-book");
const submitButton = document.getElementById("create");

newButton.addEventListener("click", () => {
  newBook();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createBook();
});

displayBooks();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  let myBook = new Book(title, author, pages, read);
  myLibrary.push(myBook);
}

function displayBooks() {
  newPage.remove();
  const table = document.getElementById("table");

  table.innerHTML = `<tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Remove</th></tr>`;

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    addElementToRow(book.title, row);
    addElementToRow(book.author, row);
    addElementToRow(book.pages, row);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.dataset.index = index;

    const readButton = document.createElement("button");
    readButton.innerText = book.read ? "Yes" : "No";
    readButton.dataset.index = index;

    readButton.addEventListener("click", (event) => {
      const bookIndex = event.target.dataset.index;
      myLibrary[bookIndex].toggleReadStatus();
      displayBooks();
    });

    removeButton.addEventListener("click", (event) => {
      const bookIndex = event.target.dataset.index;
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });

    const readButtonTd = document.createElement("td");
    readButtonTd.appendChild(readButton);
    row.appendChild(readButtonTd);

    const removeButtonTd = document.createElement("td");
    removeButtonTd.appendChild(removeButton);
    row.appendChild(removeButtonTd);

    table.appendChild(row);
  });
}

function addElementToRow(content, row) {
  const td = document.createElement("td");
  td.innerText = content;
  row.appendChild(td);
}

function newBook() {
  indexPage.remove();
  container.appendChild(newPage);
}

function retrieveInfo(name) {
  const element = document.getElementById(name);

  if (element.type === "checkbox") {
    return element.checked;
  }

  return element.value;
}

function createBook() {
  const createdBook = new Book(
    retrieveInfo("title"),
    retrieveInfo("author"),
    retrieveInfo("pages"),
    retrieveInfo("read")
  );

  myLibrary.push(createdBook);

  container.appendChild(indexPage);
  displayBooks();
}
