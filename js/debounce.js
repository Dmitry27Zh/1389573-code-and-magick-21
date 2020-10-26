'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debaunce = function (cb) {
    let lastTimeout = null;
    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
