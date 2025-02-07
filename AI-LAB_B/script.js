// Klasa zarządzająca listą To-Do
class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.render();
    }

    addTask(taskText, taskDate) {
        if (taskText.length < 3 || taskText.length > 255) {
            alert("Zadanie musi mieć od 3 do 255 znaków!");
            return;
        }
        if (taskDate && new Date(taskDate) < new Date()) {
            alert("Data musi być w przyszłości!");
            return;
        }

        this.tasks.push({ text: taskText, date: taskDate });
        this.save();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.save();
    }

    editTask(index, newText, newDate) {
        this.tasks[index].text = newText;
        this.tasks[index].date = newDate;
        this.save();
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.render();
    }

    render() {
        const list = document.getElementById("todo-list");
        list.innerHTML = "";

        this.tasks.forEach((task, index) => {
            const li = document.createElement("li");

            // Tworzenie pola do edycji tekstu
            const taskText = document.createElement("input");
            taskText.type = "text";
            taskText.value = task.text;
            taskText.classList.add("task-input");
            taskText.readOnly = true;
            taskText.addEventListener("dblclick", () => this.startEditing(index, taskText, taskDate));

            // Tworzenie pola do edycji daty
            const taskDate = document.createElement("input");
            taskDate.type = "datetime-local";
            taskDate.value = task.date || "";
            taskDate.classList.add("date-input");
            taskDate.readOnly = true;
            taskDate.addEventListener("dblclick", () => this.startEditing(index, taskText, taskDate));

            // Przycisk usuwania
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "🗑";
            deleteBtn.onclick = () => this.removeTask(index);

            li.appendChild(taskText);
            li.appendChild(taskDate);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    }

    startEditing(index, textElement, dateElement) {
        textElement.readOnly = false;
        dateElement.readOnly = false;

        // Po kliknięciu poza element zapisujemy zmiany
        const saveChanges = () => {
            this.editTask(index, textElement.value, dateElement.value);
            textElement.readOnly = true;
            dateElement.readOnly = true;
        };

        textElement.addEventListener("blur", saveChanges);
        dateElement.addEventListener("blur", saveChanges);
    }
}

// Inicjalizacja listy
const todo = new Todo();

// Dodawanie nowego zadania
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date").value;
    todo.addTask(taskInput.value, taskDate);
    taskInput.value = "";
}

// Wyszukiwanie zadań
function filterTasks() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const listItems = document.querySelectorAll("#todo-list li");

    listItems.forEach(li => {
        const taskText = li.querySelector(".task-input").value.toLowerCase();
        if (taskText.includes(searchValue)) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
}