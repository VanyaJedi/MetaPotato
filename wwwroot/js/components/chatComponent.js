import AbstractComponent from "./abstractComponent.js";
import mediaService from "../modules/mediaService.js";
import { removeAllClasses } from "../utils/other.js";
const chat = document.querySelector('.messenger');


export default class Chat extends AbstractComponent {
    constructor() {
        super();
        this._element = chat;
        this._usersBlock = this._element.querySelector('.users');
        this._userList = this._element.querySelector('.users__list');
        this._messagesBlock = this._element.querySelector('.messages');
        this._messagesList = this._element.querySelector('.messages__list');
        this._closeChatMobileBtn = this._messagesBlock.querySelector('.messages__icon-btn-back');
        this.typeArea = this._element.querySelector('.messages__typeArea');
        this._sendBtn = this._element.querySelector('.messages__send-btn');

        this.messagesList = this._element.querySelector('.messages__list');

        //bind handlers
        this.showMessagesMobileHandler = this.showMessagesMobileHandler.bind(this);
        this.hideMessagesMobileHandler = this.hideMessagesMobileHandler.bind(this);
        this.whenMobileChat = this.whenMobileChat.bind(this);
        this.whenNotMobileChat = this.whenNotMobileChat.bind(this);
    }

    getElement() {
        return this._element;
    }

    //handlers

    refreshUserName(userName) {
        this.getElement().querySelector('.messages__username').innerText = userName;
    }

    setActiveUser(evt) {
        const userNodes = this._userList.querySelectorAll('.users__item');
        removeAllClasses(userNodes, 'users__item--active');
        evt.target.closest('.users__item').classList.add('users__item--active');
    }

    setUserItemClickHandler(handler) {
        this._userList.addEventListener('click', handler);
    }

    setSendMessageHandler(handler) {
        this._sendBtn.addEventListener('click', handler);
    }

    showMessagesMobileHandler(evt) {
        if (this.isClickTargetMeansToShowChat(evt)) {
            this._messagesBlock.classList.add('messages--show');
            this._usersBlock.classList.add('users--hide');
        }
    }

    hideMessagesMobileHandler() {
        this._messagesBlock.classList.remove('messages--show');
        this._usersBlock.classList.remove('users--hide');
    }

    isClickTargetMeansToShowChat(evt) {
        return !(evt.target.classList.contains('users__name') || evt.target.classList.contains('users__avatar'));
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