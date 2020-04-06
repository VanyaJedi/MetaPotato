﻿const openMenuBtn = document.querySelector('.master-header__menu-open');
const closeMenuBtn = document.querySelector('.master-header__menu-close');
const headerSection = document.querySelector('.master-header');
const showSearchBtn = document.querySelector('.master-header__show-search');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const searchResult = document.querySelector('.search__result');
const searchBackBtn = document.querySelector('.search__icon-btn-back');
const menuBlock = document.querySelector('.menu');
const menuUser = document.querySelector('.menu__user');

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
    searchInput.addEventListener('blur', hideSearchResultNotMobile)
}

const whenNotTabletSearch = function () {
    searchInput.blur();
    searchInput.removeEventListener('blur', hideSearchResultNotMobile)
}

const whenDesktopMenu = function () {
    menuUser.addEventListener('click', showMenuDesktop);

}

const whenNotDesktopMenu = function () {
    menuUser.removeEventListener('click', showMenuDesktop);

}


if (mediaService.mqlDesktop.matches) {
    menuUser.addEventListener('click', showMenuDesktop);
}

openMenuBtn.addEventListener('click', openMenuHandler);
closeMenuBtn.addEventListener('click', closeMenuHandler);

showSearchBtn.addEventListener('click', showSearchHandler);
searchBackBtn.addEventListener('click', hideSearchHandler);

searchInput.addEventListener('focus', showSearchResultHandler);


mediaService.subscribe('search', 'tablet', whenTabletSearch, whenNotTabletSearch)
mediaService.subscribe('desktopMenu', 'desktop', whenDesktopMenu, whenNotDesktopMenu)