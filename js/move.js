'use strict';

(function () {
  const dialogHandle = window.setup.setupElement.querySelector(`.upload`);

  const moveDialog = function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      window.setup.setupElement.style.left = `${window.setup.setupElement.offsetLeft - shift.x}px`;
      window.setup.setupElement.style.top = `${window.setup.setupElement.offsetTop - shift.y}px`;
    };
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onCLickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onCLickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onCLickPreventDefault);
      }
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const moveDialogOn = function () {
    dialogHandle.addEventListener(`mousedown`, moveDialog);
  };
  const moveDialogOff = function () {
    dialogHandle.removeEventListener(`mousedown`, moveDialog);
    window.setup.setupElement.removeAttribute(`style`);
  };
  window.move = {
    moveDialogOn,
    moveDialogOff,
  };
})();
