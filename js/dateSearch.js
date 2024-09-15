/*------------------------dateSearch------------------------*/
// Function: Generate Date Selector.

export function createDateSearch(
  selectedDate,
  updateCalendar,
  updateTodoList,
  todos
) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth() + 1; // Months start at 0, so add 1 to display the correct month.
  const currentDay = today.getDate();

  // Container
  const dateSearchContainer = document.createElement("div");
  dateSearchContainer.classList.add("date-search-container");

  // Dropdown Menu
  const yearSelect = document.createElement("select");
  const monthSelect = document.createElement("select");
  const daySelect = document.createElement("select");

  // Year Menu
  for (let i = 2020; i <= 2030; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    if (i === currentYear) {
      option.selected = true;
    }
    yearSelect.appendChild(option);
  }

  // Month Menu
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    if (i === currentMonthIndex) {
      option.selected = true;
    }
    monthSelect.appendChild(option);
  }

  // Day Menu
  function updateDaySelect() {
    daySelect.innerHTML = "";
    const daysInMonth = new Date(
      yearSelect.value,
      monthSelect.value,
      0
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      if (i === currentDay) {
        option.selected = true;
      }
      daySelect.appendChild(option);
    }
  }
  updateDaySelect();

  // Update Day Options When Month or Year Changes
  yearSelect.addEventListener("change", updateDaySelect);
  monthSelect.addEventListener("change", updateDaySelect);
  // go button
  const goButton = document.createElement("button");
  goButton.textContent = "go";
  goButton.classList.add("go-button");

  goButton.addEventListener("click", () => {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);
    const selectedDay = parseInt(daySelect.value);

    const selectedDateValue = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay
    );
    selectedDate.date = selectedDateValue;

    const currentMonth = new Date(selectedYear, selectedMonth - 1);

    updateCalendar(currentMonth);
    updateTodoList();
  });

  //today Button
  const todayButton = document.createElement("button");
  todayButton.textContent = "today";
  todayButton.classList.add("today-button");

  todayButton.addEventListener("click", () => {
    const today = new Date();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth() + 1;
    updateDaySelect(); // Rebuild Day Dropdown Menu to Match Selected Month and Year
    daySelect.value = today.getDate();
    selectedDate.date = today;
    updateCalendar(today);
    updateTodoList();
  });

  dateSearchContainer.appendChild(yearSelect);
  dateSearchContainer.appendChild(monthSelect);
  dateSearchContainer.appendChild(daySelect);
  dateSearchContainer.appendChild(goButton);
  dateSearchContainer.appendChild(todayButton);

  return dateSearchContainer;
}
