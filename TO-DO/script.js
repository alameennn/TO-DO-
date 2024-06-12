document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        
        const taskDate = new Date().toLocaleDateString();
        const dateSpan = document.createElement('span');
        dateSpan.textContent = taskDate;
        dateSpan.classList.add('task-date');
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const importantButton = document.createElement('button');
        importantButton.textContent = 'Important';
        importantButton.classList.add('important-btn');
        importantButton.addEventListener('click', () => {
            li.classList.toggle('important');
            sortTasks();
        });

        li.appendChild(dateSpan);
        li.appendChild(taskTextSpan);
        li.appendChild(completeButton);
        li.appendChild(importantButton);
        taskList.appendChild(li);

        taskInput.value = '';
        sortTasks();
    }

    // Function to sort tasks so important tasks are at the top
    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            if (a.classList.contains('important') && !b.classList.contains('important')) return -1;
            if (!a.classList.contains('important') && b.classList.contains('important')) return 1;
            return 0;
        });
        tasks.forEach(task => taskList.appendChild(task));
    }

    // Event listener for add button
    addTaskButton.addEventListener('click', addTask);

    // Event listener for enter key on input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
