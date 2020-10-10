'use strict';

(function () {
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.setupElement.querySelector(`.setup-close`);
  const wizardCoat = window.setup.setupElement.querySelector(`.wizard-coat`);
  const coatColor = window.setup.setupElement.querySelector(`input[name="coat-color"]`);
  const wizardEyes = window.setup.setupElement.querySelector(`.wizard-eyes`);
  const eyesColor = window.setup.setupElement.querySelector(`input[name="eyes-color"]`);
  const fireball = window.setup.setupElement.querySelector(`.setup-fireball-wrap`);
  const fireballColor = window.setup.setupElement.querySelector(`input[name="fireball-color"]`);

  const popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  const wizardCoatClickHandler = function () {
    window.colorize(window.setup.COAT_COLORS, coatColor.value, wizardCoat);
  };

  const wizardEyesClickHandler = function () {
    window.colorize(window.setup.EYES_COLORS, eyesColor.value, wizardEyes);
  };

  const fireballClickHandler = function () {
    window.colorize(window.setup.FIREBALL_COLORS, fireballColor.value, fireball);
  };

  const openPopup = function () {
    window.setup.setupElement.classList.remove(`hidden`);
    setupClose.addEventListener(`click`, setupCloseClickHandler);
    setupClose.addEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.removeEventListener(`click`, setupOpenClickHandler);
    setupOpen.removeEventListener(`keydown`, setupOpenKeydownHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    window.setupValidation.userNameInputCheckOn();
    wizardCoat.addEventListener(`click`, wizardCoatClickHandler);
    wizardEyes.addEventListener(`click`, wizardEyesClickHandler);
    fireball.addEventListener(`click`, fireballClickHandler);
  };

  const closePopup = function () {
    window.setup.setupElement.classList.add(`hidden`);
    setupClose.removeEventListener(`click`, setupCloseClickHandler);
    setupClose.removeEventListener(`keydown`, setupCloseKeydownHandler);
    setupOpen.addEventListener(`click`, setupOpenClickHandler);
    setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);
    document.removeEventListener(`keydown`, popupEscPressHandler);
    window.setupValidation.userNameInputCheckOff();
    wizardCoat.removeEventListener(`click`, wizardCoatClickHandler);
    wizardEyes.removeEventListener(`click`, wizardEyesClickHandler);
    fireball.removeEventListener(`click`, fireballClickHandler);
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
