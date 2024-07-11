const myLibrary = [
  { name: "The Lord of the Rings", author: "Tolkien", status: "read" },
  { name: "Alice in Wonderland", author: "Lewis Caroll", status: "not read" },
  { name: "Naruto", author: "Masashi Kishimoto", status: "read" }
];

const modal = document.getElementById("bookModal");
const newbook = document.getElementById("newbook");
const close = document.getElementById("close");
const newBookForm = document.getElementById("newBookForm");
const librarySection = document.getElementById("librarySection");

// "New Book" button opens the modal
newbook.addEventListener("click", () => {
  modal.style.display = "block";
});

// "Close" button closes the modal
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // To prevent form submission

  const book = document.getElementById("book").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;

  addBookToLibrary(book, author, status);
  renderLibrary();
  modal.style.display = "none";
  newBookForm.reset();
});

function addBookToLibrary(name, author, status) {
  myLibrary.push({ name, author, status });
}

function renderLibrary() {
  librarySection.innerHTML = "";

  myLibrary.forEach((book, index) => {
    let newBookElement = document.createElement("tr");
    newBookElement.classList.add("book");

    newBookElement.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.status}</td>
      <td>
        <button class="toggle-read-btn">${
          book.status === "read" ? "Read" : "Not read yet"
        }</button>
        <button class="remove-book-btn">Remove</button>
      </td>
    `;

    // Event listener to remove the book
    newBookElement.querySelector(".remove-book-btn").addEventListener("click", () => {
      removeBookFromLibrary(index);
      renderLibrary();
    });

    // Event listener to toggle the read status
    newBookElement.querySelector(".toggle-read-btn").addEventListener("click", () => {
      toggleBookReadStatus(index);
      renderLibrary();
    });

    librarySection.appendChild(newBookElement);
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function toggleBookReadStatus(index) {
  const book = myLibrary[index];
  book.status = book.status === "read" ? "not read" : "read";
}

// Initial render
renderLibrary();
