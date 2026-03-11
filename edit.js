import { Tasks, setIsediting } from "./script.js";

export function editBtn(index) {
    document.querySelector('.js-input-field').value =Tasks[index].taskValue;
    setIsediting(index)
}