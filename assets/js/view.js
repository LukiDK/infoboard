import { activityConfig } from "./configs/activity_config.js";
import {
  appendNodeList,
  clear,
  createEl,
  createElWithText,
} from "./utils/createUtils.js";
import { toLocaleTime } from "./utils/timeUtils.js";
import { getWeekNumber, getTimeDate } from "./model.js";

// Get the main container and attach a new classname to it
let mainContainer = document.getElementById("container");
mainContainer.classList.add("container");

// Create activity view
export const createActivityView = (arr) => {
  // Clear the view (reset)
  let activityContainer = document.getElementById("klasser");
  clear(activityContainer);

  // Create and append an h2 element
  let heading = createElWithText("h2", "HER FINDER DU OS");
  heading.classList.add("activity-heading");
  activityContainer.appendChild(heading);

  // Loop through each element in the data array
  arr.forEach((element, index) => {
    // Only do this if index is less them max number of allowed activities
    if (index < activityConfig.maxNum) {
      // Create container for p tags
      let activityWrapper = createEl("div");

      // Create all the P tags
      let p_room = createElWithText("p", `Room: ${element.Room}`);
      let p_education = createElWithText("p", `${element.Education}`);
      let p_subject = createElWithText("p", `Subject: ${element.Subject}`);
      let p_startDate = createElWithText(
        "p",
        `${toLocaleTime(element.StartDate).slice(0, 5)}`
      );

      // Append elements to DOM
      let nodeList = [p_education, p_room, p_subject, p_startDate];
      appendNodeList(nodeList, activityWrapper);
      activityWrapper.classList.add("activity-item");
      activityContainer.appendChild(activityWrapper);
    }
  });
};

// View
export function renderMeals(meals) {
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
          <div class="meal-dish-name">${day.Dish.replace(
            " - kr. 35,00",
            ""
          )}</div>
        </div>
      `;
  });

  mealContainer.innerHTML += mealsHTML;
}

// Display getTimeDate()
function displayTimeDate() {
  var { time, dateTime } = getTimeDate();
  document.getElementById(
    "time"
  ).innerHTML = `<p class="time">${time}</p><p class="date">${dateTime}</p>`;
}

// Update time and date automaticly every second
setInterval(displayTimeDate, 1000);

displayTimeDate();
