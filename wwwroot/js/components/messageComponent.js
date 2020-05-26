import AbstractComponent from './abstractComponent';

const createMessageUserInfoTemplate = (userName, isFriend) => {
    if (isFriend) {
        return (`<div class="message__user">
                    <img src="img/default_avatar.png" />
                    <span class="message__name">${userName}</span>
                </div>`);
    }

    return '';
};

export default class Message extends AbstractComponent {
    constructor(message, username, isFriend = null) {
        super();
        this._message = message;
        this._username = username;
        this._isFriend = isFriend;
    }

    getTemplate() {
        const userInfoTemplate = createMessageUserInfoTemplate(this._username, this._isFriend);

        return (
            `<li class="message messages__item ${this._isFriend ? '' : 'message--my'}">
                ${userInfoTemplate}
                <div class="message__content">
                    <span>${this._message}</span>
                </div>
            </li>
            `
        );
    }
}
