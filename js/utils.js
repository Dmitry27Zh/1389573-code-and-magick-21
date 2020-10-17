'use strict';

(function () {
  const KEY_CLICK = `Enter`;
  const KEY_CLOSE = `Escape`;
  const isEscEvent = function (evt, action) {
    if (evt.key === KEY_CLOSE) {
      evt.preventDefault();
      action();
    }
  };
  const isEnterEvent = function (evt, action) {
    if (evt.key === KEY_CLICK) {
      action();
    }
  };
  const getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
  window.utils = {
    isEscEvent,
    isEnterEvent,
    getRandomItem,
  };
})();
