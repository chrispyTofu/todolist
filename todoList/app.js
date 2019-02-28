//UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const btn = document.querySelector('#btn');


loadEventListeners();


function loadEventListeners() {

    //load dom
    document.addEventListener("DOMContentLoaded", getTasks);
    //add task
    form.addEventListener('submit', addTask);

    taskInput.addEventListener('animationend', (e) => {
        taskInput.classList.remove("apply-shake");
    });

    //remove task
    taskList.addEventListener('click', removeTask);

    //clear tasks
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);


}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create list
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create link element for deletion
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        taskInput.classList.add("apply-shake");
    } else {
        //Create list
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create link element for deletion
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        //store in local storage
        storeTaskinLocalStorage(taskInput.value);

        taskInput.value = '';

    }
    e.preventDefault();
}

function storeTaskinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLS(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLS();
}

function clearTasksFromLS() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';

            } else {
                task.style.display = 'none';
            }
        });
}
