"use strict"

const valueInput = document.getElementById("valueInput");
const modal = document.getElementById("modal");
const templateTask = document.getElementById("template");
const radioButtons = document.getElementsByName("list");
const taskList = document.getElementById("taskList-all"); 


const optionSelected = "option-selected";
const REMOVE_PROMPT = "Czy na pewno chcesz usunąć zadanie o treści: ";

let removedElement = null;
let removedOrigin = null;
let currentlyRemoved = null;

const doneToggleFunc = (event) => {
    const liElement = event.target.closest("li");
    const taskContent = liElement.querySelector(".task-text");
    const dateField = liElement.querySelector(".date");

    if (!taskContent) return;

    if (liElement.classList.contains("task-undone")) {
        liElement.classList.replace("task-undone", "task-done");
        dateField.innerHTML = getTimeNow();
    } else {
        liElement.classList.replace("task-done", "task-undone");
        dateField.innerHTML = "";
    }
};

const getTimeNow = () => {
    const curDate = new Date();
    const h = curDate.getHours().toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false });
    const m = curDate.getMinutes().toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false });;
    const day = curDate.getDate();
    let month = String(curDate.getMonth());
    if (month.length === 1) {
        month = "0" + month;
    }
    const year = curDate.getFullYear();
    const timeNow = `${h}:${m} ${day}.${month}.${year}`;
    return timeNow;
};

const handleRemoval = (event) => {
    currentlyRemoved = event.target.closest("li");
    removedElement = currentlyRemoved;
    removedOrigin = currentlyRemoved.parentNode;
    const taskContent = currentlyRemoved.querySelector(".task-text").textContent;
    document.getElementById("remove-prompt").innerHTML = REMOVE_PROMPT + taskContent; 
};

const buildListElement = (text) => {
    const element = templateTask.cloneNode(true);
    element.classList.remove("hidden");
    element.addEventListener("click", doneToggleFunc);
    element.firstElementChild.innerHTML = text;
    const box = element.lastElementChild;
    const cross = box.lastElementChild;
    box.firstElementChild.innerHTML = "";

    cross.addEventListener("click", (event) => {
        event.stopPropagation(); 
        handleRemoval(event);   
        modal.showModal();         
        modal.classList.replace("dialog-hidden", "dialog-shown");
    });
    return element;
};

const handleAdd = () => {
    const text = valueInput.value;
    if (text !== "") {
        const item = buildListElement(text);
        taskList.appendChild(item);
        valueInput.value = ""; 
    }
};

const handleUndo = () => {
    if (removedElement !== null) {
        removedOrigin.appendChild(removedElement);
        removedElement = null;
    }
};

const closeDialog = () => {
    modal.close();
    modal.classList.replace("dialog-shown", "dialog-hidden")
};

const confirmRemoval = () => {
    currentlyRemoved.remove();
    currentlyRemoved = null;
    closeDialog();
}


document.getElementById("addBtn").addEventListener("click", handleAdd);

document.getElementById("undoBtn").addEventListener("click", handleUndo);

document.getElementById("cancel").addEventListener("click", closeDialog);

document.getElementById("yes").addEventListener("click", confirmRemoval);
