
const taskInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-task-button');
let taskList = document.getElementById('task-list');

addButton.addEventListener('click', addTask);

addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listItem = document.createElement('li');

        // Create a checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create a span for the task text
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        // Add checkbox and text to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        taskList.appendChild(listItem);

        taskInput.value = '';
    }
};

// clear all button
const clearButton = document.getElementById('clear-tasklist');

clearButton.addEventListener('click', function() {
    taskList.innerHTML = '';
});
