
const URL_GET_MESSAGES = 'Messages/Messages/';
const URL_GET_INITIAL_DATA = 'Messages/InitialData/';
const URL_ADD_USER_TO_CONTACT = 'Home/AddUserToContact';

export default class Api {
    _load({
        url,
        method = 'GET',
        body = null,
        headers = new Headers(),
    }, auth = null) {
        if (auth) {
            headers.append('Authorization', auth);
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
        //return [];
        return 'error';
    }

    getMessages(chatRoomId) {
        return this._load({ url: `${URL_GET_MESSAGES}?chatRoomId=${chatRoomId}` })
            .then((response) => response.json())
            .catch(this._onError);
    }

    getInitialData() {
        return this._load({ url: URL_GET_INITIAL_DATA })
            .then((response) => response.json())
            .catch(this._onErrorMessages);
    }

    addToContactList(login, user) {
        return this._load({
            url: `${URL_ADD_USER_TO_CONTACT}?ALogin=${login}&ANewUser=${user}`
        }).then((response) => {
            console.log(response);
        });
    }

    getEmojisPack() {
        return this._load({
            url: 'https://unpkg.com/emoji.json/emoji.json'
        }).then((response) => response.json());
    }
}
