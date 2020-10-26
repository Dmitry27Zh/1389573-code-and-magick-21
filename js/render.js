'use strict';

(function () {
  const setup = window.dialog.element;
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const MAX_SIMILAR_WIZARD_QUANTITY = 4;

  const createWizardElement = function (wizard) {
    const wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  const addWizardsElements = function (wizards) {
    const fragment = document.createDocumentFragment();
    const wizardsQuantity = wizards.length > MAX_SIMILAR_WIZARD_QUANTITY ? MAX_SIMILAR_WIZARD_QUANTITY : wizards.length;
    for (let i = 0; i < wizardsQuantity; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }
    const similarList = setup.querySelector(`.setup-similar-list`);
    similarList.innerHTML = ``;
    similarList.appendChild(fragment);
  };

  window.render = addWizardsElements;
})();
