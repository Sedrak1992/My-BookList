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
  <td> <a href="#" onclick="openModal(${i})"><i class="fa-solid fa-pen-to-square"></i></a>  <a href="#"class="delete"  onclick="removeItem(${i})"> X </a></td>
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
const modal = document.querySelector(".modal");
const deleteBtn = document.querySelector("#delete");
const inputTitle = document.querySelector("#inputTitle");
const inputAuthor = document.querySelector("#inputAuthor");
const inputISBN = document.querySelector("#inputISBN");
const buttonSave = document.querySelector(".buttonSave");
let selected;

function openModal(index){
  selected = index;
  inputTitle.value = list[index].title;
  inputAuthor.value = list[index].author;
  inputISBN.value = list[index].isbn;
  modal.classList.toggle("modal_close");
}

buttonSave.addEventListener("click", () => {
  let item = {
    title: inputTitle.value,
    author: inputAuthor.value,
    isbn: inputISBN.value,
  };

  list[selected] = item;
  localStorage.setItem("items",JSON.stringify(list));
  render();
  modal.classList.toggle("modal_close");
});
deleteBtn.addEventListener("click", () => {
  modal.classList.toggle("modal_close");
});
