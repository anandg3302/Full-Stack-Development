const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");

let tasksArray = [];

function updateTaskCount() {
    taskCount.textContent = "Total Tasks: " + tasksArray.length;
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    tasksArray.push(taskText);
    updateTaskCount();

    const li = document.createElement("li");
    li.style.opacity = 0; // for fade-in

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // When checkbox is clicked → remove task with fade-out
    checkbox.addEventListener("change", () => {
        li.style.transition = "opacity 0.5s";
        li.style.opacity = 0;
        setTimeout(() => {
            todoList.removeChild(li);
            tasksArray = tasksArray.filter(t => t !== taskText);
            updateTaskCount();
        }, 500);
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(taskText));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    // Delete button still works as usual
    delBtn.addEventListener("click", () => {
        li.style.transition = "opacity 0.5s";
        li.style.opacity = 0;
        setTimeout(() => {
            todoList.removeChild(li);
            tasksArray = tasksArray.filter(t => t !== taskText);
            updateTaskCount();
        }, 500);
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);

    // Fade-in animation
    setTimeout(() => {
        li.style.transition = "opacity 0.5s";
        li.style.opacity = 1;
    }, 50);

    input.value = "";
    input.focus();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

