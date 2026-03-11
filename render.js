import { Tasks } from "./script.js";

export function renderTasks() {
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