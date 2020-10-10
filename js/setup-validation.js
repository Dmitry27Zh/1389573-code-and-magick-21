'use strict';

(function () {
  const userNameInput = window.setup.setupElement.querySelector(`.setup-user-name`);
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
  const userNameInputCheckOn = function () {
    userNameInput.addEventListener(`input`, userNameInputHandler);
  };
  const userNameInputCheckOff = function () {
    userNameInput.removeEventListener(`input`, userNameInputHandler);
  };
  window.setupValidation = {
    userNameInputCheckOn,
    userNameInputCheckOff,
  };
})();

