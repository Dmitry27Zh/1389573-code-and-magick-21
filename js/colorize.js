'use strict';

(function () {
  const getNewColor = function (array, currentColor) {
    let newColor = window.utils.getRandomItem(array);
    while (newColor === currentColor) {
      newColor = window.utils.getRandomItem(array);
    }
    return newColor;
  };
  window.colorize = function (array, currentColor, element) {
    currentColor = getNewColor(array, currentColor);
    if (element.tagName.toLowerCase() === `div`) {
      element.style.backgroundColor = currentColor;
    } else {
      element.style.fill = currentColor;
    }
  };
})();
