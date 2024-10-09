import { getData, getWeekNumber, getTimeDate } from "./model.js";

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

// View
function renderMeals(meals) {
  const mealContainer = document.getElementById("frokost");

  // Display the current week number
  const weekNumber = getWeekNumber(new Date());
  const weekNumberElement = document.createElement("p");
  weekNumberElement.textContent = `DEN VARME UGE ${weekNumber}`;
  weekNumberElement.classList.add("meal-week-number");
  mealContainer.appendChild(weekNumberElement);

  let mealsHTML = "";

  // Loop through each day and create the HTML structure
  meals.forEach((day) => {
    mealsHTML += `
      <div class="meal-day">
        <div class="meal-day-name">${day.DayName.substring(0, 3)}</div>
        <div class="meal-dish-name">${day.Dish.replace(" - kr. 35,00", "")}</div>
      </div>
    `;
  });

  mealContainer.innerHTML += mealsHTML;
}

// Controller
async function initMeals() {
  const url = "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";
  const data = await getData(url);
  renderMeals(data.Days || []);
}

initMeals(); // Initialize the controller