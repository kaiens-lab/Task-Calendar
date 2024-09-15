import { renderWeekHeader } from "./weekHeader.js";
import { renderPrevMonthDates } from "./prevMonthDates.js";
import { renderCurrentMonthDates } from "./currentMonthDates.js";
import { renderNextMonthDates } from "./nextMonthDates.js";

// Main Function of Calendar
export function renderCalendar(
  calendarElement,
  currentMonthElement,
  currentMonth,
  todos,
  selectedDate,
  renderTodoList
) {
  // Clear calendar content.
  calendarElement.innerHTML = "";

  // renderWeekHeader
  renderWeekHeader(calendarElement);

  // Display for this month
  currentMonthElement.textContent = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // container of dates
  const datesContainer = document.createElement("div");
  datesContainer.classList.add("dates-container");

  // Get the date of the first day & last day of this month
  const startDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Get the last date of prev month
  const prevMonthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  );

  renderPrevMonthDates(
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
  );

  renderCurrentMonthDates(
    currentMonth,
    endDate,
    datesContainer,
    selectedDate,
    renderTodoList,
    renderCalendar,
    todos,
    calendarElement,
    currentMonthElement
  );

  renderNextMonthDates(
    currentMonth,
    datesContainer,
    selectedDate,
    renderTodoList,
    renderCalendar,
    todos,
    calendarElement,
    currentMonthElement
  );

  calendarElement.appendChild(datesContainer);
}

// Calendar Switching Function
export function MonthNavigation(
  prevMonthButton,
  nextMonthButton,
  currentMonth,
  updateCalendar
) {
  prevMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    updateCalendar(currentMonth);
  });

  nextMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    updateCalendar(currentMonth);
  });
}
