const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const TODO_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let toDos = [];
let finished = [];

// function firstBtnToDo(event, insp) {
//   secondBtnToDo(event, insp);
//   const btn = event.target;
//   const li = btn.parentNode;
//   const formText = li.querySelector("span").innerText;
//   paintToForm(formText, insp);
//   saveToDo();
// }

// function secondBtnToDo(event, insp) {
//   const btn = event.target;
//   const li = btn.parentNode;
//   if (insp === TODO_LS) {
//     toDoList.removeChild(li);
//     const cleanToFinished = finished.filter(function filterFn(finish) {
//       return finish.id !== parseInt(li.id);
//     });
//     finished = cleanToFinished;
//   } else {
//     finishedList.removeChild(li);
//     const cleanToDos = toDos.filter(function filterFn(toDo) {
//       return toDo.id !== parseInt(li.id);
//     });
//     toDos = cleanToDos;
//   }
//   saveToDo();
// }
function replayToDo(event) {
  deleteToFinished(event);
  const btn = event.target;
  const li = btn.parentNode;
  const toDoText = li.querySelector("span").innerText;
  paintToForm(toDoText, TODO_LS);
  saveToDo();
}

function checkToDo(event, insp) {
  deleteToDo(event);
  if (insp === TODO_LS) console.log("hi");
  const btn = event.target;
  const li = btn.parentNode;
  const finishedText = li.querySelector("span").innerText;
  paintToForm(finishedText, FINISHED_LS);
  saveToDo();
}

function deleteToFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToFinished = finished.filter(function filterFn(finish) {
    return finish.id !== parseInt(li.id);
  });
  finished = cleanToFinished;
  saveToDo();
}

function clearToForm() {
  console.log(toDoList.childNodes); // 모든 list들을 어떻게 삭제하는지?
  // toDoList.forEach(function (toDo) {
  //   toDo.removeChild(li);
  // });
}
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  clearToForm();
  // toDos.forEach(function (toDo) {
  //   // paintToDo(toDo.text);
  //   paintToForm(toDo.text, TODO_LS);
  // });
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function createBtnChild(text, firstBtn, secondBtn, insp) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(firstBtn);
  li.appendChild(secondBtn);
  if (insp === TODO_LS) toDoList.appendChild(li);
  else finishedList.appendChild(li);
  const formObj = {
    text: text,
    id: newId,
  };
  return formObj;
}

function paintToForm(text, insp) {
  const firstBtn = document.createElement("button");
  const secondBtn = document.createElement("button");

  if (insp === TODO_LS) {
    firstBtn.innerText = "✅";
    firstBtn.addEventListener("click", checkToDo);
    secondBtn.innerText = "❌";
    secondBtn.addEventListener("click", deleteToDo);
    toDos.push(createBtnChild(text, firstBtn, secondBtn, insp));
  } else {
    firstBtn.innerText = "⏪";
    firstBtn.addEventListener("click", replayToDo);
    secondBtn.innerText = "❌";
    secondBtn.addEventListener("click", deleteToFinished);
    finished.push(createBtnChild(text, firstBtn, secondBtn, insp));
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const submitValue = toDoInput.value;
  paintToForm(submitValue, TODO_LS);
  saveToDo();
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  const finishedToDo = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach(function (toDo) {
      // paintToDo(toDo.text);
      paintToForm(toDo.text, TODO_LS);
    });
  }
  if (finishedToDo !== null) {
    const parsedTofinished = JSON.parse(finishedToDo);
    parsedTofinished.forEach(function (finish) {
      // paintToFinished(finish.text);

      paintToForm(finish.text, FINISHED_LS);
    });
  }
}
function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
