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
      const dateKey = prevDate.toDateString();
      if (todos[dateKey] && todos[dateKey].length > 0) {
        const allCompleted = todos[dateKey].every((todo) => todo.completed);
        const dotElement = document.createElement("span");
        dotElement.classList.add("todo-dot");
        if (allCompleted) {
          dotElement.classList.add("completed");
        }
        dateElement.appendChild(dotElement);
      }

      datesContainer.appendChild(dateElement);
    }
  }
}
