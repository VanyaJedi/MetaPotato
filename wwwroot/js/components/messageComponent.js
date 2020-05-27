import AbstractComponent from './abstractComponent';
import { createAvatarTemplate } from '../utils/other';

const createMessageUserInfoTemplate = (userName, userAvatar, isFriend) => {
    if (isFriend) {
        const avatar = createAvatarTemplate(userAvatar);
        return (`<div class="message__user">
                    ${avatar}
                    <span class="message__name">${userName}</span>
                </div>`);
    }

    return '';
};

export default class Message extends AbstractComponent {
    constructor(message, username, userAvatar, isFriend = null) {
        super();
        this._message = message;
        this._username = username;
        this._userAvatar = userAvatar;
        this._isFriend = isFriend;
    }

    getTemplate() {
        const userInfoTemplate = createMessageUserInfoTemplate(this._username, this._userAvatar, this._isFriend);

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
