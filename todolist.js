
const taskInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-task-button');
let taskList = document.getElementById('task-list');

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
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

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete-task-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });
        

        // Add checkbox and text to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(deleteButton); // Add delete 'x' button
        taskList.appendChild(listItem);

        taskInput.value = '';
    }
};



// clear all button
const clearButton = document.getElementById('clear-tasklist');

clearButton.addEventListener('click', function() {
    taskList.innerHTML = '';
});
