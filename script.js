const Tasks =  JSON.parse(localStorage.getItem('Tasks')) || [];
const inputField = document.querySelector('.js-input-field');
const buttonLm = document.querySelector('.js-add-task');
const taskList = document.querySelector('.js-task-list');

let editingIndex = null;

inputField.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        addTask()
    }
})

buttonLm.addEventListener('click',()=>{
    addTask()
    console.log(Tasks);
})


function renderTasks() {
    let TasksHTML = "";
    Tasks.forEach((task, index)=>{
        const grayedTask = task.completed ? "completed" : "";
        const completedClass = task.completed ? "disabled-btn" : "";
        const disabledAtrr = task.completed ? "disabled" : ""
    TasksHTML += `
     <li class="task-item ${grayedTask}">

          <span class="task-text ${task.completed ? 'completed-task' : ''}">
            ${task.taskValue}
          </span>

          <div class="task-actions">

            <button class="complete-btn js-complete-btn ${completedClass}" data-index="${index}" ${disabledAtrr}>
              ✓
            </button>

            <button class="edit-btn js-edit-btn ${completedClass}" data-index="${index}" ${disabledAtrr}>
              Edit
            </button>

            <button class="delete-btn js-delete-btn"  data-index="${index}">
              Delete
            </button>

          </div>

        </li>

    `
    })
    taskList.innerHTML = TasksHTML;
}

function deleteBtn(index) {
    Tasks.splice(index, 1)
    renderTasks()
    saveTOLocalStorage()
    console.log(Tasks);
    
}
function editBtn(index, button) {
    buttonLm.textContent = 'Save Edit';    
    const taskItem = button.closest('.task-item');
    const completebtn = taskItem.querySelector('.js-complete-btn');
    const deleteBtn = taskItem.querySelector('.js-delete-btn');

    completebtn.textContent = "Editing..."
    completebtn.disabled = true;
    completebtn.classList.add('disabled-btn')

    deleteBtn.textContent = "Editing..."
    deleteBtn.disabled = true;
    deleteBtn.classList.add('disabled-btn')
    inputField.value =Tasks[index].taskValue;
    editingIndex = index;
}
function completedBtn(index) {
    Tasks[index].completed = !Tasks[index].completed;
    renderTasks();
    saveTOLocalStorage();

}
function saveTOLocalStorage() {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}

function addTask() {
    const inputValue = inputField.value;
    if (inputValue === "") return

    if (editingIndex !== null) {
        Tasks[editingIndex].taskValue = inputValue;
        editingIndex=null
        buttonLm.textContent = "Add Task";
    } else {
        Tasks.push({taskValue:inputValue, completed:false})
    }
    renderTasks()
    saveTOLocalStorage()
    inputField.value = '';
}

renderTasks()

taskList.addEventListener('click', (event)=>{
    if (event.target.classList.contains('js-delete-btn')) {
        const index = event.target.dataset.index;
        deleteBtn(index)
    }else if (event.target.classList.contains('js-edit-btn')) {
        const index = event.target.dataset.index;
        editBtn(index, event.target)
    }else if (event.target.classList.contains('js-complete-btn')) {
        const index = event.target.dataset.index;
        completedBtn(index)
    }
})