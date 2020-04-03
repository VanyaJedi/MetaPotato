'use strict';

const openMenuBtn = document.querySelector('.master-header__menu-open');
const closeMenuBtn = document.querySelector('.master-header__menu-close');
const headerSection = document.querySelector('.master-header');
const showSearchBtn = document.querySelector('.master-header__show-search');
const logoSearchBlock = document.querySelector('.master-header__logo-search');

openMenuBtn.addEventListener('click', function () {
    headerSection.classList.remove('master-header--close-menu');
});

closeMenuBtn.addEventListener('click', function () {
    headerSection.classList.add('master-header--close-menu');
});

showSearchBtn.addEventListener('click', function () {
    logoSearchBlock.classList.toggle('master-header__logo-search--open');
});
