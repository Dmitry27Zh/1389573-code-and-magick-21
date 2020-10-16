'use strict';

(function () {
  const setup = document.querySelector(`.setup`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const createWizardElement = function (wizard) {
    const wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyeColor;
    return wizardElement;
  };

  const addWizardsElements = function (wizards) {
    const fragment = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      fragment.appendChild(createWizardElement(wizard));
    });
    const similarList = setup.querySelector(`.setup-similar-list`);
    similarList.appendChild(fragment);
  };

  const deactivateSetup = function () {
    window.setupValidation.userNameInputCheckOff();
    window.colorize.wizardCoatEventRemove();
    window.colorize.wizardEyesEventRemove();
    window.colorize.fireballEventRemove();
    window.move.moveDialogOff();
  };

  const activateSetup = function () {
    window.setupValidation.userNameInputCheckOn();
    window.colorize.wizardCoatEventAdd();
    window.colorize.wizardEyesEventAdd();
    window.colorize.fireballEventAdd();
    window.move.moveDialogOn();
  };

  addWizardsElements(window.data.wizards);
  setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  window.setup = {
    element: setup,
    deactivate: deactivateSetup,
    activate: activateSetup,
  };
})();


