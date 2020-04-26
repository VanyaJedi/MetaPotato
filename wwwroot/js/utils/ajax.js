
const RESPONSE_STATUS_SUCCESS = 200;

const requestToServer = function (url, type, responseType, data, timeout, onLoad, onError) {
    const xhr = new XMLHttpRequest();
     xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
        if (xhr.status === RESPONSE_STATUS_SUCCESS) {
            onLoad(xhr.response);
        } else if (onError) {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
    });

    if (onError) {
        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
    }

    xhr.timeout = timeout;

    xhr.open(type, url);
    xhr.send(data || {});
};

export default requestToServer;