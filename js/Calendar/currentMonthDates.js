import { addTodoMarker } from "../todoUtils.js";
/*------------------------CurrentMonthDates------------------------*/
// Function: Generate Current Month Calendar.

export function renderCurrentMonthDates(
  currentMonth,
  endDate,
  datesContainer,
  selectedDate,
  renderTodoList,
  renderCalendar,
  todos,
  calendarElement,
  currentMonthElement
) {
  for (let i = 1; i <= endDate.getDate(); i++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    );
    const dateElement = document.createElement("div");
    dateElement.textContent = i;
    dateElement.addEventListener("click", () => {
      selectedDate.date = date;
      renderTodoList();
      renderCalendar(
        calendarElement,
        currentMonthElement,
        currentMonth,
        todos,
        selectedDate,
        renderTodoList
      );
    });
    if (selectedDate.date.toDateString() === date.toDateString()) {
      dateElement.classList.add("selected");
    }

    // Check if there are todos for the date & mark if all are completed.
    // Add To-Do Marker.
    addTodoMarker(date, todos, dateElement);

    datesContainer.appendChild(dateElement);
  }
}
