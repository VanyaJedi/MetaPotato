'use strict';

const showRegistBtn = document.querySelector('.start-auth__register-btn');
const blockLogin = document.querySelector('.start-auth__auth-block');
const blockRegist = document.querySelector('.start-auth__regist-block');
const backToLoginBtn = document.querySelector('.start-auth__back-btn');
const startAuth = document.querySelector('.start-auth');

showRegistBtn.addEventListener('click', function () {
    startAuth.classList.remove('start-auth--login');
    startAuth.classList.add('start-auth--register');
});

backToLoginBtn.addEventListener('click', function () {
    startAuth.classList.add('start-auth--login');
    startAuth.classList.remove('start-auth--register');
});