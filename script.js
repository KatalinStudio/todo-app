// Get elements from the DOM
const input = document.getElementById("todo-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Source of truth
let todos = [];

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos to the DOM
function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = todo.text;

        span.addEventListener("click", () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Add todo via button
button.addEventListener("click", () => {
    const todoText = input.value.trim();

    if (todoText === "") return;

    todos.push({
        text: todoText,
        completed: false
    });

    input.value = "";
    saveTodos();
    renderTodos();
});

// Add todo via Enter key
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

// Initial load
loadTodos();
renderTodos();
