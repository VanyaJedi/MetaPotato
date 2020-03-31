'use strict';

const openMenuBtn = document.querySelector('.master-header__menu-open');
const closeMenuBtn = document.querySelector('.master-header__menu-close');
const headerSection = document.querySelector('.master-header');

openMenuBtn.addEventListener('click', function () {
    headerSection.classList.remove('master-header--close-menu');
});

closeMenuBtn.addEventListener('click', function () {
    headerSection.classList.add('master-header--close-menu');
});

console.log(1);