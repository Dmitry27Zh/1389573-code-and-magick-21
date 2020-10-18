'use strict';

(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/code-and-magick`;
  const URL_LOAD = `https://21.javascript.pages.academy/code-and-magick/data`;
  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;

  const save = function (data, onLoad) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, onLoad);
    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  };

  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`get`, URL_LOAD);
    xhr.send();
  };

  window.backend = {
    save,
    load,
  };
})();
