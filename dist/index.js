"use strict";
const btn = document.getElementById('btn');
const btnDelete = document.getElementById('btnDelete');
const input = document.getElementById('toDoInput');
const form = document.querySelector('form');
const list = document.getElementById("toDoList");
let todos = readTodos();
viewInfo();
function viewInfo() {
    todos.forEach(createTodoElement);
}
function readTodos() {
    const tososJSON = localStorage.getItem("todos");
    if (tososJSON === null)
        return [];
    return JSON.parse(tososJSON);
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    if (input.value == "")
        return;
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodoElement(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
}
function createTodoElement(todo) {
    const newLi = document.createElement('li');
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", () => {
        todo.completed = checkBox.checked;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkBox);
    list === null || list === void 0 ? void 0 : list.append(newLi);
}
form.addEventListener('submit', handleSubmit);
btnDelete.addEventListener('click', () => {
    localStorage.clear();
    list.innerHTML = "";
});
