// Samle view og model
import { filterCurrentActivities, getData, sortActivities } from "./model.js";
import { createActivityView } from "./view.js";
import { filterValidActivities } from "./model.js";
import { renderMeals } from "./view.js";

// Function to set another function to run on an interval
const onInterval = (time, callback) => {
  setInterval(async () => {
    await callback();
  }, time * 1000);
};

// Gets all the activity data, sorts it, filters it and creates a view
const bindActivities = async () => {
  let rawActivityData = await getData(
    "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed"
  );
  let filteredActivityData = filterValidActivities(rawActivityData.value);
  let currentActivityData = filterCurrentActivities(filteredActivityData);
  let sortedData = sortActivities(currentActivityData);
  createActivityView(sortedData);
};

// Run bindActivites on first "load"
bindActivities();

// Starts an interval that re-fetches and re-renders the view code
// every 30 seconds.
onInterval(10, async () => await bindActivities());

async function initMeals() {
  const url =
    "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";
  const data = await getData(url);
  renderMeals(data.Days || []);
}

initMeals(); // Initialize the controller
