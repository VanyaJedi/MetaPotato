'use strict';

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
const MEDIA_QUERY_TABLET = '(min-width: 768px)';
const mediaQueryListTablet = window.matchMedia(MEDIA_QUERY_TABLET);

openMenuBtn.addEventListener('click', function () {
    headerSection.classList.remove('master-header--close-menu');
});

closeMenuBtn.addEventListener('click', function () {
    headerSection.classList.add('master-header--close-menu');
});

showSearchBtn.addEventListener('click', function () {
    search.classList.add('search--show');
    searchInput.focus();
});

searchBackBtn.addEventListener('click', function () {
    search.classList.remove('search--show');
    searchInput.blur();
});

searchInput.addEventListener('focus', function () {
    searchResult.classList.add('search__result--open');
});

if (mediaQueryListTablet.matches) {
    searchInput.addEventListener('blur', function () {
        searchResult.classList.remove('search__result--open');
    });
};

menuUser.addEventListener('click', function () {
    menuBlock.classList.toggle('menu--openlist');
});
