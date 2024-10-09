// Helper function to convert date stamps to LocaleTimeString (eg. 10.00 or 11.00)
export const toLocaleTime = (_date) => {
  let localeDate = new Date(_date);
  return localeDate.toLocaleTimeString("da-DK");
};
