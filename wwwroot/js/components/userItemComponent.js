﻿import moment from 'moment';
import AbstractComponent from './abstractComponent';
import { removeAllClasses, createAvatarTemplate } from '../utils/other';

export default class UserItem extends AbstractComponent {
    constructor(userItem, container) {
        super();
        this._userItem = userItem;
        this._container = container;
        this._clickHandler = null;
    }

    getTemplate() {
        const {
            userLogin,
            lastMessage,
            lastMessageDateTime,
            userAvatar,
        } = this._userItem;
        const lastMessageTime = moment(lastMessageDateTime).format('HH:mm');
        const avatarTemplate = createAvatarTemplate(userAvatar, 'users__avatar');
        return (
            `<li class="users__item">
              <div class="users__item-wrapper">
                  
                  ${avatarTemplate}
                  <div class="users__name-message">
                      <span class="users__name">${userLogin}</span>
                      <div class="users__last-text">
                          <span>${lastMessage}</span>
                      </div>
                  </div>
                  <span class="users__time">
                    ${lastMessageTime}
                  </span>
              </div>
          </li>
            `
        );
    }

    setUserItemClick(handler) {
        this._clickHandler = handler;
        this.getElement().addEventListener('click', handler);
    }

    makeActive() {
        this.getElement().classList.add('users__item--active');
    }

    clearAllActive() {
        removeAllClasses(this._container.querySelectorAll('.users__item'), 'users__item--active');
    }
}