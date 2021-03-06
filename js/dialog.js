'use strict';

(function () {
  const dialog = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = dialog.querySelector(`.setup-close`);

  const popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  const openPopup = function () {
    window.dialog.element.classList.remove(`hidden`);
    setupClose.addEventListener(`click`, setupCloseClickHandler);
    setupClose.addEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.removeEventListener(`click`, setupOpenClickHandler);
    setupOpen.removeEventListener(`keydown`, setupOpenKeydownHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    window.setup.activate();
  };

  const closePopup = function () {
    dialog.classList.add(`hidden`);
    setupClose.removeEventListener(`click`, setupCloseClickHandler);
    setupClose.removeEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.addEventListener(`click`, setupOpenClickHandler);
    setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);
    document.removeEventListener(`keydown`, popupEscPressHandler);
    window.setup.deactivate();
  };

  const setupOpenClickHandler = function () {
    openPopup();
  };

  const setupOpenKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  };

  const setupCloseClickHandler = function () {
    closePopup();
  };

  const setupCloseKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  };

  setupOpen.addEventListener(`click`, setupOpenClickHandler);
  setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);

  window.dialog = {
    element: dialog,
    closePopup,
  };
})();
