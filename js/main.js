import { renderCalendar, MonthNavigation } from "./Calendar/calendarRender.js";
import { renderTodoList } from "./todoRender.js";
import { addTodo, deleteTodo } from "./todoList.js";
import { loadTodos, saveTodos } from "./storage.js";
import { createDateSearch } from "./dateSearch.js";

document.addEventListener("DOMContentLoaded", function () {
  const calendarElement = document.getElementById("calendar");
  const currentMonthElement = document.getElementById("current-month");
  const dateDisplay = document.getElementById("date-display");
  const todoItemsElement = document.getElementById("todo-items");
  const newTodoInput = document.getElementById("new-todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");

  // Initialize state
  const todos = loadTodos();
  let currentMonth = new Date();
  const selectedDate = { date: new Date() };

  //updateCalendar: Updated display of the calendar
  function updateCalendar(monthToUpdate) {
    if (monthToUpdate) {
      currentMonth = monthToUpdate;
    }
    renderCalendar(
      calendarElement,
      currentMonthElement,
      currentMonth,
      todos,
      selectedDate,
      updateTodoList
    );
  }
  //updateTodoList: Update and render the to-do list for the selected date.
  function updateTodoList() {
    renderTodoList(
      dateDisplay,
      todoItemsElement,
      selectedDate,
      todos,
      () => saveTodos(todos),
      updateCalendar
    );
  }

  // Initial Render of Calendar and To-Do List
  updateCalendar();
  updateTodoList();

  MonthNavigation(
    prevMonthButton,
    nextMonthButton,
    currentMonth,
    updateCalendar
  );

  //add todo Button
  addTodoButton.addEventListener("click", () => {
    const newTodoText = newTodoInput.value.trim();
    if (newTodoText === "") return;
    newTodoInput.classList.add("new-todo-input");

    addTodo(todos, selectedDate, newTodoText);
    newTodoInput.value = "";
    saveTodos(todos);
    updateTodoList();
    updateCalendar();
  });

  // dateSearch
  const dateSearchContainer = createDateSearch(selectedDate, updateCalendar);
  calendarElement.insertAdjacentElement("afterend", dateSearchContainer);
});
