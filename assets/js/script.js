// Get time, day, date, month and year
function getTimeDate() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var time =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes);
  var day = today.toLocaleString("en-us", { weekday: "long" });
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var dateTime = time + " " + day + " " + date;
  return { time, dateTime };
}

// Display getTimeDate()
function displayTimeDate() {
  var { time, dateTime } = getTimeDate();
  document.getElementById(
    "clock"
  ).innerHTML = `<p class="time">${time}</p><p class="date">${dateTime}</p>`;
}

// Update time and date automaticly every second
setInterval(displayTimeDate, 1000);

displayTimeDate();

// Model
function fetchMeals() {
  return fetch(
    "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json"
  )
    .then((response) => response.json())
    .then((data) => data.Days) // Extract the array of days
    .catch((error) => {
      console.error("Error fetching meal data:", error);
      return [];
    });
}

// Function to get the current week number
function getWeekNumber(week) {
  week = new Date(
    Date.UTC(week.getFullYear(), week.getMonth(), week.getDate())
  );
  week.setUTCDate(week.getUTCDate() + 4 - (week.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(week.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((week - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

// View
function renderMeals(meals) {
  const mealContainer = document.getElementById("frokost");

  // Clear existing content
  mealContainer.innerHTML = "";

  // Create a header for the meal plan
  const header = document.createElement("h2");
  header.textContent = "DAGENS FROKOST";
  header.classList.add("meal-header");
  mealContainer.appendChild(header);

  // Display the current week number
  const weekNumber = getWeekNumber(new Date());
  const weekNumberElement = document.createElement("p");
  weekNumberElement.textContent = `DEN VARME UGE ${weekNumber}`;
  weekNumberElement.classList.add("meal-week-number");
  mealContainer.appendChild(weekNumberElement);

  // Loop through each day and create a container
  meals.forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("meal-day");

    // Create the left div for the day name
    const dayName = document.createElement("div");
    dayName.classList.add("meal-day-name");
    // Display only the first 3 letters of the day name
    dayName.textContent = day.DayName.substring(0, 3); // Assuming API has a "DayName" field

    // Create the right div for the dish name
    const dishName = document.createElement("div");
    dishName.classList.add("meal-dish-name");
    // Remove " - kr. 35,00"
    dishName.textContent = day.Dish.replace(" - kr. 35,00", "");

    // Append day name and dish name to the day container
    dayContainer.appendChild(dayName);
    dayContainer.appendChild(dishName);

    // Append the day container to the main container
    mealContainer.appendChild(dayContainer);
  });
}

// Controller
function initMeals() {
  fetchMeals().then((meals) => renderMeals(meals));
}

initMeals(); // Initialize the controller