
const users = document.querySelector('.users');
const userList = document.querySelector('.users__list');
const messages = document.querySelector('.messages');
const closeChatMobileBtn = messages.querySelector('.messages__icon-btn-back');

import "./modules/visual.js";
import { mediaService } from "./modules/mediaService.js";



const showMessagesHandlerMobile = function (evt) {
    if (evt.target.closest('.users__item')) {
        messages.classList.add('messages--show');
        users.classList.add('users--hide');
    }
}

const hideMessagesHandlerMobile = function () {
    messages.classList.remove('messages--show');
    users.classList.remove('users--hide');
}

const whenMobileChat = () => {
    users.addEventListener('click', showMessagesHandlerMobile);
    closeChatMobileBtn.addEventListener('click', hideMessagesHandlerMobile); 
}

const whenNotMobileChat = () => {
    users.removeEventListener('click', showMessagesHandlerMobile);
    closeChatMobileBtn.removeEventListener('click', hideMessagesHandlerMobile); 
}

if (mediaService.mqlmobile.matches) {
    whenMobileChat()
}
mediaService.subscribe('mobileChat', 'mobile', whenMobileChat, whenNotMobileChat);

console.log(mediaService);