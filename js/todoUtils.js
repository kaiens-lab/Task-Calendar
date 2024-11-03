export function addTodoMarker(date, todos, dateElement) {
  const dateKey = date.toDateString();
  if (todos[dateKey] && todos[dateKey].length > 0) {
    const allCompleted = todos[dateKey].every((todo) => todo.completed);
    const dotElement = document.createElement("span");
    dotElement.classList.add("todo-dot");
    if (allCompleted) {
      dotElement.classList.add("completed");
    }
    dateElement.appendChild(dotElement);
  }
}
