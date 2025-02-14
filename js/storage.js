// Save todos to localStorage
export function saveTodos(todos) {
  console.log("Saving todos to localStorage:", todos); // Debug log
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
    const parsedTodos = JSON.parse(storedTodos);
    if (Array.isArray(parsedTodos)) {
      console.warn(
        "Unexpected array format in localStorage. Converting to object."
      );
      return { "2025-02-15": parsedTodos };
    }
    return parsedTodos;
  } catch (error) {
    console.error("Error parsing todos from localStorage:", error);
    return {};
  }
}
