'use strict';

(function () {
  const wizardCoat = window.setup.setupElement.querySelector(`.wizard-coat`);
  const coatColor = window.setup.setupElement.querySelector(`input[name="coat-color"]`);
  const wizardEyes = window.setup.setupElement.querySelector(`.wizard-eyes`);
  const eyesColor = window.setup.setupElement.querySelector(`input[name="eyes-color"]`);
  const fireball = window.setup.setupElement.querySelector(`.setup-fireball-wrap`);
  const fireballColor = window.setup.setupElement.querySelector(`input[name="fireball-color"]`);
  const getNewColor = function (array, currentColor) {
    let newColor = window.utils.getRandomItem(array);
    while (newColor === currentColor) {
      newColor = window.utils.getRandomItem(array);
    }
    return newColor;
  };
  const colorize = function (array, currentColorElement, element) {
    currentColorElement.value = getNewColor(array, currentColorElement.value);
    if (element.tagName.toLowerCase() === `div`) {
      element.style.backgroundColor = currentColorElement.value;
    } else {
      element.style.fill = currentColorElement.value;
    }
  };

  const colorizeWizardCoat = function () {
    colorize(window.setup.COAT_COLORS, coatColor, wizardCoat);
  };

  const colorizeWizardEyes = function () {
    colorize(window.setup.EYES_COLORS, eyesColor, wizardEyes);
  };

  const colorizeFireball = function () {
    colorize(window.setup.FIREBALL_COLORS, fireballColor, fireball);
  };

  const wizardCoatEventAdd = function () {
    wizardCoat.addEventListener(`click`, colorizeWizardCoat);
  };

  const wizardCoatEventRemove = function () {
    wizardCoat.removeEventListener(`click`, colorizeWizardCoat);
  };

  const wizardEyesEventAdd = function () {
    wizardEyes.addEventListener(`click`, colorizeWizardEyes);
  };

  const wizardEyesEventRemove = function () {
    wizardEyes.removeEventListener(`click`, colorizeWizardEyes);
  };

  const fireballEventAdd = function () {
    fireball.addEventListener(`click`, colorizeFireball);
  };

  const fireballEventRemove = function () {
    fireball.removeEventListener(`click`, colorizeFireball);
  };

  window.colorize = {
    wizardCoatEventAdd,
    wizardCoatEventRemove,
    wizardEyesEventAdd,
    wizardEyesEventRemove,
    fireballEventAdd,
    fireballEventRemove,
  };
})();
