'use strict';

(function () {
  const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const WIZARDS_QUANTITY = 4;

  const generateWizards = function () {
    const wizards = [];
    for (let i = 1; i <= WIZARDS_QUANTITY; i++) {
      const wizard = {};
      wizard.name = `${window.utils.getRandomItem(NAMES)} ${window.utils.getRandomItem(SURNAMES)}`;
      wizard.coatColor = `${window.utils.getRandomItem(COAT_COLORS)}`;
      wizard.eyeColor = `${window.utils.getRandomItem(EYES_COLORS)}`;
      wizards.push(wizard);
    }
    return wizards;
  };

  const wizards = generateWizards();

  window.data = {
    COAT_COLORS,
    EYES_COLORS,
    FIREBALL_COLORS,
    wizards,
  };
})();
