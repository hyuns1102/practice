const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const TODO_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let toDos = [];
let finished = [];

function replayToDo(event) {
  delteToFinished(event);
  const btn = event.target;
  const li = btn.parentNode;
  const toDoText = li.querySelector("span").innerText;
  paintToDo(toDoText);
  saveToDo();
}

function checkToDo(event) {
  deleteToDo(event);
  const btn = event.target;
  const li = btn.parentNode;
  const finishedText = li.querySelector("span").innerText;
  paintToFinished(finishedText);
  saveToDo();
}

function delteToFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToFinished = finished.filter(function filterFn(finish) {
    return finish.id !== parseInt(li.id);
  });
  finished = cleanToFinished;
  saveToDo();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}
function saveToFinished() {
  // localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", checkToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  console.log("hi");
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
}

function paintToFinished(text) {
  const li = document.createElement("li");
  const replayBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  replayBtn.innerText = "⏪";
  replayBtn.addEventListener("click", replayToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delteToFinished);
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(replayBtn);
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId,
  };
  finished.push(finishedObj);
}

function handleSubmit(event) {
  event.preventDefault();
  const submitValue = toDoInput.value;
  paintToDo(submitValue);
  saveToDo();
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  const finishedToDo = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (finishedToDo !== null) {
    const parsedTofinished = JSON.parse(finishedToDo);
    parsedTofinished.forEach(function (finish, fin) {
      paintToFinished(finish.text);
    });
  }
}
function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
