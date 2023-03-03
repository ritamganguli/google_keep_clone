const addButton = document.querySelector("#add");
//Bhai mere local stoarge ke value ko update kar do
const updateLocalStorageData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);
  //Agar kabhi bhi local storage me items save karne ho to from an array to JSON.stringify() use karte
  localStorage.setItem("notes", JSON.stringify(notes));
};


const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"} "> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

  note.insertAdjacentHTML("afterbegin", htmlData);
  // console.log(note);

  // getting the References
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // deleting the node
  delButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  // toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  //Ye change kya karega jab tak me next event me nahi chala jata tab tak data save nahi karega and jase hi me next event me chala jaunga ye function call kar lega
  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLocalStorageData();
  });

  document.body.appendChild(note);
  // it appeds a node as the last child of  a node
};

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());