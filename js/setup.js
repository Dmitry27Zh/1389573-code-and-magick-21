'use strict';

(function () {
  const setup = window.dialog.element;
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const MAX_SIMILAR_WIZARD_QUANTITY = 4;

  const createWizardElement = function (wizard) {
    const wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    return wizardElement;
  };

  const addWizardsElements = function (wizards) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_SIMILAR_WIZARD_QUANTITY; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }
    const similarList = setup.querySelector(`.setup-similar-list`);
    similarList.appendChild(fragment);
  };

  const errorHandler = function (message) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
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

  /* addWizardsElements(window.data.wizards); */
  window.backend.load(addWizardsElements, errorHandler);

  const form = setup.querySelector(`.setup-wizard-form`);
  form.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(form), function () {
      window.dialog.closePopup();
    });
    evt.preventDefault();
  });

  setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  window.setup = {
    element: setup,
    deactivate: deactivateSetup,
    activate: activateSetup,
  };
})();


