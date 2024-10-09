// Helper function to create a new element
export const createEl = (el) => {
  return document.createElement(el);
};

// Helper function to create a new element with innerText
export const createElWithText = (el, text) => {
  let newEl = document.createElement(el);
  newEl.innerText = text;
  return newEl;
};

// Helper function to append a node list to a DOM element (target)
export const appendNodeList = (nodeList, target) => {
  nodeList.forEach((item) => {
    target.append(item);
  });
};

// Function to clear target element of all HTML (eg. reset view)
export const clear = (target) => {
  target.innerHTML = ``;
};
