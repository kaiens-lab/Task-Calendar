// Save todos to localStorage
export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
export function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (!storedTodos) {
    console.log("No todos found in localStorage. Returning empty object.");
    return {};
  }

  try {
    return JSON.parse(storedTodos);
  } catch (error) {
    console.error("Error parsing todos from localStorage:", error);
    return {};
  }
}
