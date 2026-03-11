const Tasks =  JSON.parse(localStorage.getItem('Tasks')) || [];
console.log(Tasks);
let editingIndex = null;
document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        addTask()
    }
})

const buttonLm = document.querySelector('.js-add-task');
buttonLm.addEventListener('click',()=>{
    addTask()
    console.log(Tasks);
})


function renderTasks() {
    let TasksHTML = "";
    Tasks.forEach((task, index)=>{
        const completedClass = task.completed ? "completed" : ""
    TasksHTML += `
     <li class="task-item ${completedClass} js-task-list">

          <span class="task-text">
            ${task.taskValue}
          </span>

          <div class="task-actions">

            <button class="complete-btn js-complete-btn" data-index="${index}">
              ✓
            </button>

            <button class="edit-btn js-edit-btn" data-index="${index}" >
              Edit
            </button>

            <button class="delete-btn js-delete-btn"  data-index="${index}">
              Delete
            </button>

          </div>

        </li>

    `
    })
    document.querySelector('.js-task-list').innerHTML = TasksHTML;
}

function deleteBtn(index) {
    Tasks.splice(index, 1)
    renderTasks()
    saveTOLocalStorage()
    console.log(Tasks);
    
}
function editBtn(index) {
    document.querySelector('.js-input-field').value =Tasks[index].taskValue;
    editingIndex = index;
}
function completedBtn(index) {
    Tasks[index].completed = !Tasks[index].completed
    renderTasks();
    saveTOLocalStorage();
}
function saveTOLocalStorage() {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}

function addTask() {
    const inputValue = document.querySelector('.js-input-field').value;
    if (inputValue === "") return

    if (editingIndex !== null) {
        Tasks[editingIndex].taskValue = inputValue;
        editingIndex=null
    } else {
        Tasks.push({taskValue:inputValue, completed:false})
    }
    renderTasks()
    saveTOLocalStorage()
    document.querySelector('.js-input-field').value = '';
}

renderTasks()

const taskList = document.querySelector('.js-task-list');

taskList.addEventListener('click', (event)=>{
    if (event.target.classList.contains('js-delete-btn')) {
        const index = event.target.dataset.index;
        deleteBtn(index)
    }else if (event.target.classList.contains('js-edit-btn')) {
        const index = event.target.dataset.index;
        editBtn(index)
    }else if (event.target.classList.contains('js-complete-btn')) {
        const index = event.target.dataset.index;
        completedBtn(index)
    }
})