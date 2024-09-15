// Save todo to localStorage
export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todo from localStorage
// If no data is found, it returns an empty object `{}` by default.
export function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}
