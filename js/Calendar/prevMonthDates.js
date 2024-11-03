import { addTodoMarker } from "../todoUtils.js";
/*------------------------PrevMonthDates------------------------*/
//Function: Show Last Days of Previous Month.

export function renderPrevMonthDates(
  currentMonth,
  startDate,
  prevMonthEnd,
  datesContainer,
  selectedDate,
  renderTodoList,
  renderCalendar,
  todos,
  calendarElement,
  currentMonthElement
) {
  // Only add last month's days if the first day is not Sunday.
  if (startDate.getDay() !== 0) {
    for (let i = startDate.getDay(); i > 0; i--) {
      const prevDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEnd.getDate() - i + 1
      );
      const dateElement = document.createElement("div");
      dateElement.textContent = prevDate.getDate();
      dateElement.classList.add("other-month");
      dateElement.addEventListener("click", () => {
        selectedDate.date = prevDate;
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
      addTodoMarker(prevDate, todos, dateElement);

      datesContainer.appendChild(dateElement);
    }
  }
}
