const form = document.querySelector('#form');
const input = document.querySelector('#input');
const board = document.querySelector('#board');

// create task list
let taskList = [];

if (!localStorage.taskList) {
  taskList = [];
} else {
  taskList = JSON.parse(localStorage.getItem('taskList'));
}

// create task
class Task {
  constructor(description) {
    this.description = description;
  }
}

// add task event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  taskList.push(new Task(input.value));
  input.value = '';

  addTaskToHtml();
  updateLocalStorage();
});

// functions:
// update local stptage
function updateLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

// create task template
function createTask(item, idx) {
  return `
    <div class="task__item">
      <div class="task__item--name">${item.description}</div>
      <div class="task__item--tracking">
        <span id="timer" class="task__item--tracking--timer"
          >00:00:00</span
        >
        <span id="startStop" class="task__item--tracking--start-stop"
          ><i class="far fa-pause-circle"></i>
        </span>
        <span id="deleteTask" class="task__item--tracking--delele" onclick="deleteTask(${idx})"
          ><i class="far fa-trash-alt"></i
        ></span>
      </div>
    </div>
  `;
}

// add task to html
function addTaskToHtml() {
  board.innerHTML = '';

  taskList.map((item, idx) => {
    board.innerHTML += createTask(item, idx);
  });
}

addTaskToHtml();

// delete Task
function deleteTask(idx) {
  taskList.splice(idx, 1);

  updateLocalStorage();
  addTaskToHtml();
}
