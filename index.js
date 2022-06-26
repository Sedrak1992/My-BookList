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
  // console.log(index)
  localStorage.setItem("items", JSON.stringify(list));
  render();
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const render = () => {
  let startIndex;
  bookList.innerHTML = "";
  list.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.draggable = true;
    tr.className = "cursor"
    tr.ondragstart = () => {
      startIndex = i;
    };
    tr.ondrop = () => {
      let newList = reorder(list, startIndex, i);
      console.log(newList);
      list = newList;
      render();
      localStorage.setItem("items", JSON.stringify(newList));
    };
    tr.ondragover = (event) => {
      event.preventDefault();
    };
    tr.innerHTML = `
   <td>${i + 1}</td> 
  <td>${item.title} </td>
  <td>${item.author}</td>
  <td>${item.isbn}</td>
  <td> 
    <a href="#" onclick="openModal(${i})" class="aikanka">
      <i class="fa-solid fa-pen-to-square"></i>
    </a>  
    <a href="#"class="delete"onclick="removeItem(${i})">
    <i class="fa-solid fa-trash-can"></i>
    </a>
  </td>
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

function openModal(index) {
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
  if (
    inputTitle.value === "" ||
    inputAuthor.value === "" ||
    inputISBN.value === ""
  ) {
    alert("lracreq bolor dashter@ ");
  } else {
    list[selected] = item;
    localStorage.setItem("items", JSON.stringify(list));
    render();
    modal.classList.toggle("modal_close");
  }
});
deleteBtn.addEventListener("click", () => {
  modal.classList.toggle("modal_close");
});
