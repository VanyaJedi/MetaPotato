const openMenuBtn = document.querySelector('.master-header__menu-open');
const closeMenuBtn = document.querySelector('.master-header__menu-close');
const headerSection = document.querySelector('.master-header');
const showSearchBtn = document.querySelector('.master-header__show-search');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const searchResult = document.querySelector('.search__result');
const searchBackBtn = document.querySelector('.search__icon-btn-back');
const menuBlock = document.querySelector('.menu');
const menuUser = document.querySelector('.menu__user');
const users = document.querySelector('.users');
const userList = document.querySelector('.users__list');
const messages = document.querySelector('.messages');
const closeChatMobileBtn = messages.querySelector('.messages__icon-btn-back');

import { mediaService } from "./mediaService.js";

const openMenuHandler = function () {
    headerSection.classList.remove('master-header--close-menu');
}

const closeMenuHandler = function () {
    headerSection.classList.add('master-header--close-menu');
}

const showSearchHandler = function () {
    search.classList.add('search--show');
    searchInput.focus();
}

const hideSearchHandler = function () {
    search.classList.remove('search--show');
    searchInput.blur();
    console.log(document.activeElement);
}

const showSearchResultHandler = function () {
    searchResult.classList.add('search__result--open');
}

const hideSearchResultNotMobile = function () {
    searchResult.classList.remove('search__result--open');
}

const showMenuDesktop = function () {
    menuBlock.classList.toggle('menu--openlist');
}

const whenTabletSearch = function () {
    if (document.activeElement === searchInput) {
        showSearchResultHandler();
    }
    searchInput.addEventListener('focus', showSearchResultHandler);
    searchInput.addEventListener('blur', hideSearchResultNotMobile)
}

const whenNotTabletSearch = function () {
    searchInput.removeEventListener('focus', showSearchResultHandler);
    searchInput.removeEventListener('blur', hideSearchResultNotMobile)
}

const whenDesktopMenu = function () {
    menuUser.addEventListener('click', showMenuDesktop);
}

const whenNotDesktopMenu = function () {
    menuUser.removeEventListener('click', showMenuDesktop);
}

if (mediaService.mqldesktop.matches) {
    menuUser.addEventListener('click', showMenuDesktop);
}


if (mediaService.mqltablet.matches) {
    searchInput.addEventListener('focus', showSearchResultHandler);
    searchInput.addEventListener('blur', hideSearchResultNotMobile)
}

openMenuBtn.addEventListener('click', openMenuHandler);
closeMenuBtn.addEventListener('click', closeMenuHandler);

showSearchBtn.addEventListener('click', showSearchHandler);
searchBackBtn.addEventListener('click', hideSearchHandler);

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
    messages.classList.remove('messages--show');
    users.classList.remove('users--hide');
    users.removeEventListener('click', showMessagesHandlerMobile);
    closeChatMobileBtn.removeEventListener('click', hideMessagesHandlerMobile);
}

if (mediaService.mqlmobile.matches || mediaService.mqltablet.matches) {
    whenMobileChat()
}



mediaService.subscribe('search', 'tablet', whenTabletSearch, whenNotTabletSearch);
mediaService.subscribe('desktopMenu', 'desktop', whenDesktopMenu, whenNotDesktopMenu);
mediaService.subscribe('mobileChat', 'mobileTablet', whenMobileChat, whenNotMobileChat);
