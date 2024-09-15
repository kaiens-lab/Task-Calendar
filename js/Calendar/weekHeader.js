/*------------------------weekHeader------------------------*/
// Function: Generate Week Header

export function renderWeekHeader(calendarElement) {
  const weekHeader = document.createElement("div");
  weekHeader.classList.add("week-header");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    weekHeader.appendChild(dayElement);
  });

  calendarElement.appendChild(weekHeader);
}
