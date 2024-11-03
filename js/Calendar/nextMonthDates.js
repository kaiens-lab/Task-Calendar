import { addTodoMarker } from "../todoUtils.js";
/*------------------------NextMonthDates------------------------*/
//Function: Show First Days of Next Month.

export function renderNextMonthDates(
  currentMonth,
  datesContainer,
  selectedDate,
  renderTodoList,
  renderCalendar,
  todos,
  calendarElement,
  currentMonthElement
) {
  for (let i = 1; datesContainer.childElementCount % 7 !== 0; i++) {
    const nextDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      i
    );
    const dateElement = document.createElement("div");
    dateElement.textContent = i;
    dateElement.classList.add("other-month");
    dateElement.addEventListener("click", () => {
      selectedDate.date = nextDate;
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

    // Check if there are todos for the date & mark if all are completed.
    // Add To-Do Marker.
    addTodoMarker(nextDate, todos, dateElement);

    datesContainer.appendChild(dateElement);
  }
}
