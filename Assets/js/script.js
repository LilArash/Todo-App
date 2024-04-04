//gathering elements
const $ = document;
const todoInput = $.getElementById('todoInput');
const btnAdd = $.querySelector('.btn-addtodo');
const btnClear = $.querySelector('.btn-clear');
const todosListElem = $.querySelector('.todo');
const container = $.querySelector('.container');
const colors = $.querySelectorAll('.color');
const darkLightTogg = $.querySelector('.darkLightTogg');
let todosArr = [];
//adding todo via localstorage
function addTodo() {
    let todoObj = {
        id: todosArr.length + 1,
        title: todoInput.value,
        isComplete: false,
    }
    todoInput.value = '';
    todosArr.push(todoObj);
    setLocalStorage(todosArr);
    showTodo(todosArr);
    todoInput.focus();
}
//setting todos in localstorage
function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList));
}
//generating todos & adding to DOM
function showTodo(todosList) {
    let todoBox, btnContainer, btnComplete, btnDelete;
    todosListElem.innerHTML = '';
    todosList.forEach((todo) => {
        todoBox = $.createElement('li');
        todoTitle = $.createElement('p');
        btnContainer = $.createElement('div');
        btnComplete = $.createElement('button');
        btnDelete = $.createElement('button');
        todoTitle.innerHTML = todo.title;
        btnComplete.className = 'btn btn-done';
        btnComplete.innerHTML = '<img src="./Assets/imgs/done.svg" alt="done">';
        btnDelete.className = 'btn btn-remove';
        btnDelete.innerHTML = '<img src="./Assets/imgs/remove.svg" alt="remove">';
        btnComplete.setAttribute('onclick', `todoIsDone(${todo.id})`)
        btnDelete.setAttribute('onclick', `removeTodo(${todo.id})`);
        if (todo.isComplete) {
            todoTitle.className = 'todoIsDone';
            btnComplete.style.backgroundColor = '#5dd830';
        }
        btnContainer.append(btnComplete, btnDelete)
        todoBox.append(todoTitle, btnContainer);
        todosListElem.append(todoBox);
    });
}
//getting saved todos from localstorage
function getLocalStorage() {
    let LSTodos = JSON.parse(localStorage.getItem('todos'));
    if (LSTodos) {
        todosArr = LSTodos;
    } else {
        todosArr = [];
    }
    showTodo(todosArr);
}
//removing todos from DOM & localstorage
function clearTodos() {
    todosArr = [];
    todosListElem.innerHTML = '';
    container.style.minHeight = '15rem';
    localStorage.removeItem('todos');
}
//function fot complete button
function todoIsDone(todoID) {
    let LSTodos = JSON.parse(localStorage.getItem('todos'));
    todosArr = LSTodos;
    todosArr.forEach((todo) => {
        if (todo.id === todoID) {
            todo.isComplete = !todo.isComplete;
        }
    });
    setLocalStorage(todosArr);
    showTodo(todosArr);
}
//removing a specific todo
function removeTodo(todoID) {
    let LSTodos = JSON.parse(localStorage.getItem('todos'));
    todosArr = LSTodos;
    let todoIndex = todosArr.findIndex((todo) => {
        return todo.id === todoID;
    });
    todosArr.splice(todoIndex, 1);
    setLocalStorage(todosArr);
    showTodo(todosArr);
}
//input validation function
function inputValidation() { if (todoInput.value !== '') { addTodo(); } }
//change theme
colors.forEach((color) => {
    color.addEventListener('click', (event) => {
        const themeColor = event.target.dataset.color;
        document.documentElement.style.setProperty('--theme-color', themeColor);
        localStorage.setItem('themeColor', themeColor); // Save the selected theme to localStorage
    })
});
// Retrieve the saved theme from localStorage when the page loads
window.addEventListener('load', () => {
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
        document.documentElement.style.setProperty('--theme-color', savedThemeColor);
    }
});
//dark/light toggle
let flag = false;
function toggleDarkMode() {
    if (!flag) {
        darkLightTogg.setAttribute('src', './Assets/imgs/light.svg');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        flag = true;
    } else if (flag) {
        darkLightTogg.setAttribute('src', './Assets/imgs/dark.svg');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        flag = false;
    }
   
}
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        flag = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        flag = false;
        document.documentElement.setAttribute('data-theme', 'light');
    }
})
//events
window.addEventListener('load', getLocalStorage);
btnClear.addEventListener('click', clearTodos);
btnAdd.addEventListener('click', inputValidation);
todoInput.addEventListener('keydown', (event) => { if (event.keyCode === 13) { inputValidation(); } });
darkLightTogg.addEventListener('click', toggleDarkMode);