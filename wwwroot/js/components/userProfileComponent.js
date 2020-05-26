import AbstractComponent from './abstractComponent';



/*  createUserProfileTemplate = (isMyProfile) => {

    if (isMyProfile) {

        return (`<section class="user-profile user-profile--my">
              <div class="user-profile__wrapper">
                <button type="button" class="user-profile__close-btn">
                    <svg aria-label="Написать сообщение">
                        <use xlink:href="/build/symbol/sprite.svg#menu-close"></use>
                    </svg>
                </button>
                <div class="user-profile__user">
                    <div class="user-profile__avatar-block">
                        <img class="user-profile__avatar" src="/img/default_avatar.png" />
                        <button type="button">Изменить</button>
                    </div>

                    <div class="user-profile__user-info">
                        <span class="user-profile__user-name">
                            ${this._userName}
                        </span>
                        <span class="user-profile__user-mail">
                            boris-sobaka@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </section>
            `)
    } 

    return (`<section class="user-profile">
              <div class="user-profile__wrapper">
                <button type="button" class="user-profile__close-btn">
                    <svg aria-label="Написать сообщение">
                        <use xlink:href="/build/symbol/sprite.svg#menu-close"></use>
                    </svg>
                </button>
                <div class="user-profile__user">
                    <img class="user-profile__avatar" src="/img/default_avatar.png" />

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
            `)


};  */


export default class UserProfile extends AbstractComponent {
    constructor(userName, chatRoom) {
        super();
        this._userName = userName;
        this._chatRoom = chatRoom;
    }


    getTemplate() {
        return (
            `<section class="user-profile">
              <div class="user-profile__wrapper">
                <button type="button" class="user-profile__close-btn">
                    <svg aria-label="Написать сообщение">
                        <use xlink:href="/build/symbol/sprite.svg#menu-close"></use>
                    </svg>
                </button>
                <div class="user-profile__user">
                    <img class="user-profile__avatar" src="/img/default_avatar.png" />

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
}
