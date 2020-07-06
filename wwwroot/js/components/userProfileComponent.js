import AbstractComponent from './abstractComponent';
import { createAvatarTemplate } from '../utils/other';

export default class UserProfile extends AbstractComponent {
    constructor(userName, userAvatar, chatRoom) {
        super();
        this._userName = userName;
        this._chatRoom = chatRoom;
        this._userAvatar = userAvatar;
        this._textMessageHandler = null;
    }


    getTemplate() {
        const avatar = createAvatarTemplate(this._userAvatar, 'user-profile__avatar');
        return (
            `<section class="user-profile">
              <div class="user-profile__wrapper">
                <button type="button" class="user-profile__close-btn">
                    <svg aria-label="Написать сообщение">
                        <use xlink:href="/build/symbol/sprite.svg#menu-close"></use>
                    </svg>
                </button>
                <div class="user-profile__user">
                    ${avatar}

                    <div class="user-profile__user-info">
                        <span class="user-profile__user-name">
                            ${this._userName}
                        </span>
                        <span class="user-profile__user-mail">
                            boris-sobaka@gmail.com
                        </span>
                    </div>
                </div>

                <button class="user-profile__text-msg-btn" type="button">
                    <svg width="18" height="14" aria-label="Написать сообщение">
                        <use xlink:href="/build/symbol/sprite.svg#mail"></use>
                    </svg>
                    <span>
                        Написать сообщение
                    </span>
                </button>
            </div>
        </section>
            `
        );
    }

    setCloseUserProfileHandler(handler) {
        this.getElement().querySelector('.user-profile__close-btn').addEventListener('click', handler);
    }

    setTextMessageHander(handler) {
        this._textMessageHandler = handler;
        this.getElement().querySelector('.user-profile__text-msg-btn').addEventListener('click', handler);
    }
}
