import AbstractComponent from './abstractComponent';
import { createAvatarTemplate } from '../utils/other';
export default class UserInfo extends AbstractComponent {
    constructor(userName, userAvatar, chatRoom) {
        super();
        this._userName = userName;
        this._chatRoom = chatRoom;
        this._userAvatar = userAvatar;

        this.setOpenProfileHandler = this.setOpenProfileHandler.bind(this);
    }

    getTemplate() {
        const avatarTemplate = createAvatarTemplate(this._userAvatar);
        return (
            `<div class="messages__user-info">
                    ${avatarTemplate}
                    <span class="messages__username">${this._userName}</span>
                </div>

                <button class="messages__icon-btn-set" type="button">
                    <svg class="messages__icon messages__icon--dots" width="17" height="17" aria-label="Настройки диалога">
                        <use xlink:href="build/symbol/sprite.svg#dots"></use>
                    </svg>
                </button>
            `
        );
    }

    setOpenProfileHandler(handler) {
        this.getElement().addEventListener('click', handler);
    }
}
