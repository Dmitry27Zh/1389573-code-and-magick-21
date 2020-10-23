'use strict';

(function () {
  const URL = {
    get: `https://21.javascript.pages.academy/code-and-magick/data`,
    POST: `https://21.javascript.pages.academy/code-and-magick`,
  };
  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;

  const createRequest = function (method, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(method, URL[method]);
    xhr.timeout = TIMEOUT_IN_MS;
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
    return xhr;
  };

  const save = function (data, onLoad, onError) {
    const xhr = createRequest(`POST`, onLoad, onError);
    xhr.send(data);
  };

  const load = function (onLoad, onError) {
    const xhr = createRequest(`get`, onLoad, onError);
    xhr.send();
  };

  window.backend = {
    save,
    load,
  };
})();
