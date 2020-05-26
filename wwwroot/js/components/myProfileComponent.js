import AbstractComponent from './abstractComponent';

export default class MyProfile extends AbstractComponent {
    constructor(login) {
        super();
        this._login = login;
    }

    getTemplate() {
        return (
            `<section class="user-profile user-profile--my">
              <div class="user-profile__wrapper">
                <button type="button" class="user-profile__close-btn">
                    <svg aria-label="Закрыть мой профиль">
                        <use xlink:href="/build/symbol/sprite.svg#menu-close"></use>
                    </svg>
                </button>
                <div class="user-profile__user">
                    <div class="user-profile__avatar-block">
                        <img class="user-profile__avatar" src="/img/default_avatar.png" />
                        <button class="user-profile__change-avatar-btn" type="button">
                            <span>Изменить</span>
                        </button>
                    </div>

                    <div class="user-profile__user-info">
                        <span class="user-profile__user-name">
                            ${this._login}
                        </span>
                        <span class="user-profile__user-mail">
                            boris-sobaka@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </section> `
        );
    }

    setCloseUserProfileHandler(handler) {
        this.getElement().querySelector('.user-profile__close-btn').addEventListener('click', handler);
    }
}
