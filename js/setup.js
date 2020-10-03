'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COATCOLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYESCOLORS = [`black`, `red`, `blue`, `yellow`, `green`];
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
    wizard.coatColor = `${getRandomItem(COATCOLORS)}`;
    wizard.eyeColor = `${getRandomItem(EYESCOLORS)}`;
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


const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);

const popupEscPressHandler = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, popupEscPressHandler);
};

const closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, popupEscPressHandler);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
  setupClose.addEventListener(`click`, function () {
    closePopup();
  });
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });
});


