document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("text");
  const addTask = document.getElementById("add-task");
  const toDo = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTask.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    taskInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
    toDo.appendChild(li);
  }
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
