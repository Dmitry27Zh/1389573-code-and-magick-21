'use strict';

(function () {
  const setup = window.dialog.element;
  const setupSimilar = setup.querySelector(`.setup-similar`);
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;

  const adaptateData = function (wizards) {
    wizards.forEach(function (wizard) {
      wizard.coatColor = wizard.colorCoat;
      delete wizard.colorCoat;
      wizard.eyesColor = wizard.colorEyes;
      delete wizard.colorEyes;
    });
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

  const getRank = function (wizard) {
    let rank = 0;
    if (wizard.coatColor === coatColor) {
      rank += 2;
    }
    if (wizard.eyesColor === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.colorize.setCoatChangeHandler(window.debaunce(function (color) {
    coatColor = color;
    updateWizards();
  }));

  window.colorize.setEyesChangeHandler(window.debaunce(function (color) {
    eyesColor = color;
    updateWizards();
  }));

  let wizards = [];

  const successHandler = function (data) {
    adaptateData(data);
    wizards = data;
    updateWizards(wizards);
  };

  window.activateSimilarWizards = function () {
    setupSimilar.classList.remove(`hidden`);
    window.backend.load(successHandler, errorHandler);
  };
})();
