import { deleteBtn } from "./delete.js";
import { renderTasks } from "./render.js";
import { editBtn } from "./edit.js";
import { completedBtn } from "./completed.js";
const inputField = document.querySelector('.js-input-field');
const buttonLm = document.querySelector('.js-add-task');
const taskList = document.querySelector('.js-task-list');

export const Tasks =  JSON.parse(localStorage.getItem('Tasks')) || [];

export let editingIndex = null;
export function setIsediting(index) {
    editingIndex = index
}
export function setIsCompleted(index) {
    Tasks[index].completed = !Tasks[index].completed;
}
document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        addTask()
    }
})

buttonLm.addEventListener('click',()=>{
    addTask()
    console.log(Tasks);
})
export function saveTOLocalStorage() {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}

function addTask() {
    const inputValue = inputField.value;
    if (inputValue === "") return

    if (editingIndex !== null) {
        Tasks[editingIndex].taskValue = inputValue;
        editingIndex=null
    } else {
        Tasks.push({taskValue:inputValue, completed:false})
    }
    renderTasks()
    saveTOLocalStorage()
   inputField.value = '';
}     

renderTasks()

taskList.addEventListener('click', (event)=>{
    console.log(event);
    
    if (event.target.classList.contains('js-delete-btn')) {
        const index = event.target.dataset.index;
        deleteBtn(index)
    }else if (event.target.classList.contains('js-edit-btn')) {
        let index = event.target.dataset.index;
        editBtn(index)
    }else if (event.target.classList.contains('js-complete-btn')) {
        const index = event.target.dataset.index;
        completedBtn(index)
    }
})