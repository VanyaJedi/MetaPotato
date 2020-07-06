import AbstractComponent from './abstractComponent';
import mediaService from '../modules/mediaService';
const chat = document.querySelector('.messenger');


export default class Chat extends AbstractComponent {
    constructor() {
        super();
       // this._element = chat;
        this._usersBlock = this.getElement().querySelector('.users');
        if (this.getElement().querySelector('.users__list')) {
            this._userList = this.getElement().querySelector('.users__list');
            this._userListItems = this._userList.querySelectorAll('.users__item');
        }
        this._messagesBlock = this._element.querySelector('.messages');
        this._messagesList = this._element.querySelector('.messages__list');
        this._closeChatMobileBtn = this._messagesBlock.querySelector('.messages__icon-btn-back');
        this.typeArea = this._element.querySelector('.messages__typeArea');
        this._sendBtn = this._element.querySelector('.messages__send-btn');

        this.messagesList = this._element.querySelector('.messages__list');

        // bind handlers
        this.showMessagesMobileHandler = this.showMessagesMobileHandler.bind(this);
        this.hideMessagesMobileHandler = this.hideMessagesMobileHandler.bind(this);
        this.whenMobileChat = this.whenMobileChat.bind(this);
        this.whenNotMobileChat = this.whenNotMobileChat.bind(this);
    }

    /*getElement() {
        return this._element;
    }*/

    getTemplate() {
        return (`<div class="messenger">
                <section class="users">
                    <div class="messages__header messages__header--users notmaster-header">
                        <span>Диалоги</span>
                    </div>
                <ul class="users__list">
                </ul>
                  
                </section>

                <section class="messages">
                    <div class="messages__header notmaster-header">
                        <button class="messages__icon-btn-back" type="button">
                            <svg class="messages__icon messages__icon--back" widht="16" height="16" aria-label="Назад">
                                <use xlink:href="build/symbol/sprite.svg#back"></use>
                            </svg>
                        </button>
                        <div class="messages__user">
                          <!--user info-->
                        </div>
                    </div>
                    <div class="messages__block block">
                        <ul class="messages__list">
                        </ul>

                        <!--type area-->
                    </div>
                </section>
            </div>`);
    }


    setActiceUserInitial() {
        this._userListItems[0].classList.add('users__item--active');
    }
    // handlers

    refreshUserName(userName) {
        this.getElement().querySelector('.messages__username').innerText = userName;
    }

    setUserItemClickHandler(handler) {
        this._userList.addEventListener('click', handler);
    }


    showMessagesMobileHandler(evt) {
        const userItemElement = evt.target.closest('.users__item');
        if (userItemElement) {
            this._messagesBlock.classList.add('messages--show');
            this._usersBlock.classList.add('users--hide');
        }
    }

    hideMessagesMobileHandler() {
        this._messagesBlock.classList.remove('messages--show');
        this._usersBlock.classList.remove('users--hide');
    }

    // define change screen handlers

    whenMobileChat() {
        this._usersBlock.addEventListener('click', this.showMessagesMobileHandler);
        this._closeChatMobileBtn.addEventListener('click', this.hideMessagesMobileHandler);
    }

    whenNotMobileChat() {
        this._messagesBlock.classList.remove('messages--show');
        this._usersBlock.classList.remove('users--hide');
        this._usersBlock.removeEventListener('click', this.showMessagesMobileHandler);
        this._closeChatMobileBtn.removeEventListener('click', this.hideMessagesMobileHandler);
    }

    setScreenHandlers() {
        if (mediaService.mqlmobileTablet.matches) {
            this.whenMobileChat();
        }
    }

    subscribeMediaEvents() {
        mediaService.subscribe('mobileAndTabletChat', 'mobileTablet', this.whenMobileChat, this.whenNotMobileChat);
    }


    scrollDownMessages() {
        this._messagesList.scrollTop = this._messagesList.scrollHeight;
    }
}
