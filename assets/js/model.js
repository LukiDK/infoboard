import { activityConfig } from "./configs/activity_config.js";

// Model Code

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to get the current week number
export function getWeekNumber(week) {
  week = new Date(
    Date.UTC(week.getFullYear(), week.getMonth(), week.getDate())
  );
  week.setUTCDate(week.getUTCDate() + 4 - (week.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(week.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((week - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

// Get time, day, date, month and year
export function getTimeDate() {
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

// Function to filter valid activities by using our config file
export const filterValidActivities = (arr) => {
  let filteredData = arr.filter((item) =>
    activityConfig.validEducations.includes(item.Education)
  );
  return filteredData;
};

// Function to filter out the current activities from StartDate
export const filterCurrentActivities = (arr) => {
  let currentActivities = arr.filter(
    (item) => new Date(item.StartDate) >= new Date() - 3600000
  );
  return currentActivities;
};

// Function to sort all activities by date / time
export const sortActivities = (arr) => {
  let sortedData = arr.sort(
    (a, b) => new Date(a.StartDate) - new Date(b.StartDate)
  );
  return sortedData;
};
