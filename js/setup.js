'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const KEY_CLICK = `Enter`;
const KEY_CLOSE = `Escape`;

const WIZARDS_QUANTITY = 4;
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setup = document.querySelector(`.setup`);

const getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

const generateWizards = function () {
  const wizards = [];
  for (let i = 1; i <= WIZARDS_QUANTITY; i++) {
    const wizard = {};
    wizard.name = `${getRandomItem(NAMES)} ${getRandomItem(SURNAMES)}`;
    wizard.coatColor = `${getRandomItem(COAT_COLORS)}`;
    wizard.eyeColor = `${getRandomItem(EYES_COLORS)}`;
    wizards.push(wizard);
  }
  return wizards;
};

const createWizardElement = function (wizard) {
  const wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyeColor;
  return wizardElement;
};

const addWizardsElements = function () {
  const wizards = generateWizards();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }
  const similarList = setup.querySelector(`.setup-similar-list`);
  similarList.appendChild(fragment);
};

addWizardsElements();
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const userNameInput = setup.querySelector(`.setup-user-name`);
const wizardCoat = setup.querySelector(`.wizard-coat`);
const coatColor = setup.querySelector(`input[name="coat-color"]`);
const wizardEyes = setup.querySelector(`.wizard-eyes`);
const eyesColor = setup.querySelector(`input[name="eyes-color"]`);
const fireball = setup.querySelector(`.setup-fireball-wrap`);
const fireballColor = setup.querySelector(`input[name="fireball-color"]`);

const popupEscPressHandler = function (evt) {
  if (evt.key === KEY_CLOSE) {
    evt.preventDefault();
    closePopup();
  }
};

const userNameInputHandler = function () {
  const minLength = userNameInput.getAttribute(`minlength`);
  const maxLength = userNameInput.getAttribute(`maxlength`);
  const valueLength = userNameInput.value.length;
  if (valueLength < minLength) {
    userNameInput.setCustomValidity(`Еще ${minLength - valueLength} симв.`);
  } else if (valueLength > maxLength) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - maxLength} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
  userNameInput.reportValidity();
};

const getNewColor = function (array, currentColor) {
  let newColor = getRandomItem(array);
  while (newColor === currentColor) {
    newColor = getRandomItem(array);
  }
  return newColor;
};

const wizardCoatClickHandler = function () {
  coatColor.value = getNewColor(COAT_COLORS, coatColor.value);
  wizardCoat.style.fill = coatColor.value;
};

const wizardEyesClickHandler = function () {
  eyesColor.value = getNewColor(EYES_COLORS, eyesColor.value);
  wizardEyes.style.fill = eyesColor.value;
};

const fireballClickHandler = function () {
  fireballColor.value = getNewColor(FIREBALL_COLORS, fireballColor.value);
  fireball.style.backgroundColor = fireballColor.value;
};

const openPopup = function () {
  setup.classList.remove(`hidden`);
  setupClose.addEventListener(`click`, setupCloseClickHandler);
  setupClose.addEventListener(`keydown`, setupCloseKeydownHandler);
  setupOpen.removeEventListener(`click`, setupOpenClickHandler);
  setupOpen.removeEventListener(`keydown`, setupOpenKeydownHandler);
  document.addEventListener(`keydown`, popupEscPressHandler);
  userNameInput.addEventListener(`input`, userNameInputHandler);
  wizardCoat.addEventListener(`click`, wizardCoatClickHandler);
  wizardEyes.addEventListener(`click`, wizardEyesClickHandler);
  fireball.addEventListener(`click`, fireballClickHandler);
};

const closePopup = function () {
  setup.classList.add(`hidden`);
  setupClose.removeEventListener(`click`, setupCloseClickHandler);
  setupClose.removeEventListener(`keydown`, setupCloseKeydownHandler);
  setupOpen.addEventListener(`click`, setupOpenClickHandler);
  setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);
  document.removeEventListener(`keydown`, popupEscPressHandler);
  userNameInput.removeEventListener(`input`, userNameInputHandler);
  wizardCoat.removeEventListener(`click`, wizardCoatClickHandler);
  wizardEyes.removeEventListener(`click`, wizardEyesClickHandler);
  fireball.removeEventListener(`click`, fireballClickHandler);
};

const setupOpenClickHandler = function () {
  openPopup();
};

const setupOpenKeydownHandler = function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
};

const setupCloseClickHandler = function () {
  closePopup();
};

const setupCloseKeydownHandler = function (evt) {
  if (evt.key === KEY_CLICK) {
    closePopup();
  }
};

setupOpen.addEventListener(`click`, setupOpenClickHandler);
setupOpen.addEventListener(`keydown`, setupOpenKeydownHandler);


