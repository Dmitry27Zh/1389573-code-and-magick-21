'use strict';

(function () {
  const COAT_COLORS = window.data.COAT_COLORS;
  const EYES_COLORS = window.data.EYES_COLORS;
  const FIREBALL_COLORS = window.data.FIREBALL_COLORS;
  const setup = window.dialog.element;
  const wizardCoat = setup.querySelector(`.wizard-coat`);
  const coatColor = setup.querySelector(`input[name="coat-color"]`);
  const wizardEyes = setup.querySelector(`.wizard-eyes`);
  const eyesColor = setup.querySelector(`input[name="eyes-color"]`);
  const fireball = setup.querySelector(`.setup-fireball-wrap`);
  const fireballColor = setup.querySelector(`input[name="fireball-color"]`);

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
    return currentColorElement.value;
  };

  let wizard = {
    onCoatChange() {},
    onEyesChange() {},
  };

  const colorizeWizardCoat = function () {
    const newColor = colorize(COAT_COLORS, coatColor, wizardCoat);
    wizard.onCoatChange(newColor);
  };

  const colorizeWizardEyes = function () {
    const newColor = colorize(EYES_COLORS, eyesColor, wizardEyes);
    wizard.onEyesChange(newColor);
  };

  const colorizeFireball = function () {
    colorize(FIREBALL_COLORS, fireballColor, fireball);
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
    setCoatChangeHandler(cb) {
      wizard.onCoatChange = cb;
    },
    setEyesChangeHandler(cb) {
      wizard.onEyesChange = cb;
    },
    wizardCoatEventAdd,
    wizardCoatEventRemove,
    wizardEyesEventAdd,
    wizardEyesEventRemove,
    fireballEventAdd,
    fireballEventRemove,
  };
})();
