
const URL_TEST_MESSAGES = 'Messages/Messages/'

export default class Api {

    _load({ url, method = `GET`, body = null, headers = new Headers() }, auth = null) {
        if (auth) {
            headers.append(`Authorization`, auth);
        }
        
        return fetch(url, { method, body, headers })
            .then(this._checkStatus)
            .catch((err) => {
                throw err;
            });
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    _onErrorMessages() {
        return [];
    }

    getMessages(chatRoomId) {
        return this._load({ url: `${URL_TEST_MESSAGES}?chatRoomId=${chatRoomId}`})
            .then((response) => response.json())
            .catch(this._onError);
    }


}