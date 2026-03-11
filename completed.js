import { renderTasks } from "./render.js";
import { saveTOLocalStorage, setIsCompleted } from "./script.js";

export function completedBtn(index) {
    setIsCompleted(index)
    renderTasks();
    saveTOLocalStorage();
}