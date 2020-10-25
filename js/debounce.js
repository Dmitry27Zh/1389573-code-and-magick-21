'use strict';

(function () {
  const DEBAUNCE_INTERVAL = 500;

  window.debaunce = function (cb) {
    let lastTimeout = null;
    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...args);
      }, DEBAUNCE_INTERVAL);
    };
  };
})();
