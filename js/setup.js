'use strict';

(function () {
  const setup = window.dialog.element;

  window.activateSimilarWizards();

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

  const form = setup.querySelector(`.setup-wizard-form`);
  form.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(form), function () {
      window.dialog.closePopup();
    });
    evt.preventDefault();
  });


  window.setup = {
    deactivate: deactivateSetup,
    activate: activateSetup,
  };
})();


