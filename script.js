// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTask");
const filterSelect = document.getElementById("filter");

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(listItem);
        taskInput.value = "";
        updateLocalStorage();
    }
}

// Delete task function
function deleteTask(element) {
    const listItem = element.parentElement;
    taskList.removeChild(listItem);
    updateLocalStorage();
}

// Event listener for adding tasks
addTaskButton.addEventListener("click", addTask);

// Event listener for filtering tasks
filterSelect.addEventListener("change", filterTasks);

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

// Update local storage with current tasks
function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li span")).map((span) => span.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks based on selected option
function filterTasks() {
    const selectedFilter = filterSelect.value;
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach((task) => {
        switch (selectedFilter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                if (!task.querySelector(".checkbox").checked) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "completed":
                if (task.querySelector(".checkbox").checked) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    });
}

// Initial setup
loadTasks();
