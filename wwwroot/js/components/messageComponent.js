import AbstractComponent from "./abstractComponent.js";

export default class Message extends AbstractComponent {
    constructor(message, username, isFriend = null) {
        super();
        this._message = message;
        this._username = username;
        this._isFriend = isFriend;
    }

    getTemplate() {

        return (
            `<li class="message messages__item ${this._isFriend ? `` : `message--my`}">
                <div class="message__user">
                    <img src="img/default_avatar.png" />
                    <span class="message__name">${this._username}</span>
                </div>
                <div class="message__content">
                    <span>${this._message}</span>
                </div>
            </li>
            `
        );
    }
}

