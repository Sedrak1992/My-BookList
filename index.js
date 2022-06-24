const addBook = document.querySelector(".inputSubmit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const isbn = document.querySelector("#isbn");
const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");

const stringList = localStorage.getItem("items");
let list = stringList === null ? [] : JSON.parse(stringList);

function removeItem(index) {
  list = list.filter((item, i) => i !== index);
  localStorage.setItem("items", JSON.stringify(list));
  render();
}
const render = () => {
  bookList.innerHTML = "";
  list.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
  <td>${item.title}</td>
  <td>${item.author}</td>
  <td>${item.isbn}</td>
  <td><a href="#"class="delete" onclick="removeItem(${i})"> X </a></td>
  `;
    bookList.appendChild(tr);
  });
};

addBook.addEventListener("click", function (e) {
  e.preventDefault();
  if (title.value === "" || author.value === "" || isbn.value === "") {
    alert("Fill in all input fields");
  } else {
    list.push({
      title: title.value,
      author: author.value,
      isbn: isbn.value,
    });
    render();
    title.value = "";
    author.value = "";
    isbn.value = "";
    localStorage.setItem("items", JSON.stringify(list));
  }
});

render();
