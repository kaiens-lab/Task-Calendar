// Add Todo function.
export function addTodo(todos, selectedDate, newTodoText) {
  const selectedDateKey = selectedDate.date.toDateString();
  if (!todos[selectedDateKey]) {
    todos[selectedDateKey] = [];
  }
  todos[selectedDateKey].push({ text: newTodoText, completed: false });
}

// Delete Todo function.
export function deleteTodo(todos, selectedDate, index) {
  const selectedDateKey = selectedDate.date.toDateString();
  todos[selectedDateKey].splice(index, 1);
  console.log(todos, selectedDate, index);
}
