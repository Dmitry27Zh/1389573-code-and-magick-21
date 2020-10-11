'use strict';

(function () {
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.setupElement.querySelector(`.setup-close`);

  const popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  const openPopup = function () {
    window.setup.setupElement.classList.remove(`hidden`);
    setupClose.addEventListener(`click`, setupCloseClickHandler);
    setupClose.addEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.removeEventListener(`click`, setupOpenClickHandler);
    setupOpen.removeEventListener(`keydown`, setupOpenKeydownHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    window.setupValidation.userNameInputCheckOn();
    window.colorize.wizardCoatEventAdd();
    window.colorize.wizardEyesEventAdd();
    window.colorize.fireballEventAdd();
  };

  const closePopup = function () {
    window.setup.setupElement.classList.add(`hidden`);
    setupClose.removeEventListener(`click`, setupCloseClickHandler);
    setupClose.removeEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.addEventListener(`click`, setupOpenClickHandler);
    setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);
    document.removeEventListener(`keydown`, popupEscPressHandler);
    window.setupValidation.userNameInputCheckOff();
    window.colorize.wizardCoatEventRemove();
    window.colorize.wizardEyesEventRemove();
    window.colorize.fireballEventRemove();
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
})();
