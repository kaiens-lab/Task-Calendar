import { deleteTodo } from "./todoList.js";

export function renderTodoList(
  dateDisplay,
  todoItemsElement,
  selectedDate,
  todos,
  saveTodos,
  renderCalendar
) {
  const selectedDateKey = selectedDate.date.toDateString();
  dateDisplay.textContent = selectedDateKey;

  todoItemsElement.innerHTML = "";
  const todoList = todos[selectedDateKey] || [];

  // Move Incomplete Todos to the Front
  todoList.sort((a, b) => a.completed - b.completed);

  todoList.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = todo.completed ? "completed" : "";

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todoItem.classList.add("slide-right-disappear");
      todoItem.addEventListener("animationend", () => {
        todo.completed = checkbox.checked;
        saveTodos();
        renderTodoList(
          dateDisplay,
          todoItemsElement,
          selectedDate,
          todos,
          saveTodos,
          renderCalendar
        );
        renderCalendar();
      });
    });

    //display the todo text.
    const textDisplay = document.createElement("span");
    textDisplay.textContent = todo.text;

    // Edit-Button
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = todo.text;
      inputField.className = "edit-input";

      // Save-Button
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";

      todoItem.replaceChild(inputField, textDisplay);
      todoItem.replaceChild(saveButton, editButton);

      saveButton.addEventListener("click", () => {
        const newContent = inputField.value.trim();
        if (newContent) {
          todo.text = newContent;
        }
        saveTodos();
        textDisplay.textContent = todo.text;
        todoItem.replaceChild(textDisplay, inputField);
        todoItem.replaceChild(editButton, saveButton);
      });
    });

    // Delete-Button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      todoItem.classList.add("slide-right-disappear");
      todoItem.addEventListener("animationend", () => {
        deleteTodo(todos, selectedDate, index);
        saveTodos();
        renderTodoList(
          dateDisplay,
          todoItemsElement,
          selectedDate,
          todos,
          saveTodos,
          renderCalendar
        );
        renderCalendar();
      });
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(textDisplay);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoItemsElement.appendChild(todoItem);
  });
}
