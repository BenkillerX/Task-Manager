import { Tasks, saveTOLocalStorage} from "./script.js";
import { renderTasks } from "./render.js";
export function deleteBtn(index) {
    Tasks.splice(index, 1)
    renderTasks()
    saveTOLocalStorage()
    console.log(Tasks);
    
}