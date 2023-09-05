// selector
const inputTask = document.querySelector(".task-input");
const addTask = document.querySelector(".task-button");
const contentTask = document.querySelector(".task-container");
const filterTask = document.querySelector(".task-filter");

// event handlers
addTask.addEventListener("click", createTask);
contentTask.addEventListener("click", operation);
filterTask.addEventListener("click", filter);
document.addEventListener("DOMContentLoaded", showFromLocalStorage);

// functions
function createTask(e) {
  e.preventDefault();
  const taskContentDiv = document.createElement("div");
  taskContentDiv.classList.add("task-content");
  taskContentDiv.innerHTML = `
    <div>${inputTask.value}</div>
    <span><i class="fa-sharp fa-regular fa-square-check"></i></span>
    <span><i class="fa-solid fa-trash-can"></i></span>
  `;
  contentTask.appendChild(taskContentDiv);
  saveOnLocalStorage(inputTask.value);
  inputTask.value = "";
}

function operation(e) {
  // console.log(e.target.classList);
  // console.log(e.target.parentElement.parentElement);
  const clickedElementClassList = [...e.target.classList]; //e.target.classList DomTokenList mide k ba spread operator tabdilesh mikonim b array
  const task = e.target.parentElement.parentElement;
  if (clickedElementClassList.includes("fa-trash-can")) {
    deleteFromLocalStorage(task);
    task.remove();
  } else if (clickedElementClassList.includes("fa-square-check")) {
    task.classList.toggle("completed");
  }
}

function filter(e) {
  //   console.log(e.target.value);
  //   console.log(contentTask.childNodes);
  const tasks = [...contentTask.childNodes]; //sakhte array az NodeList ha baraye halghe zadan
  tasks.forEach((task) => {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

function saveOnLocalStorage(task) {
  // age chizi to localStorage mojod bod ono parse kone va berize to savedItems else [] araye khali berize to savedItems
  const savedTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  // task jadidi k be tabe pass dade mishe ro berize to arraye
  savedTasks.push(task);

  // savedItems ro zakhire mikonim to localStorage bsoorate key:value ~> tasks:savedItems
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function showFromLocalStorage() {
  const savedTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  savedTasks.forEach((task) => {
    const taskContentDiv = document.createElement("div");
    taskContentDiv.classList.add("task-content");
    taskContentDiv.innerHTML = `
        <div>${task}</div>
        <span><i class="fa-sharp fa-regular fa-square-check"></i></span>
        <span><i class="fa-solid fa-trash-can"></i></span>
    `;
    contentTask.appendChild(taskContentDiv);
  });
}

function deleteFromLocalStorage(task) {
  // console.log(task.children[0].innerText);
  let savedTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  savedTasks = savedTasks.filter((word) => word !== task.children[0].innerText);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}
