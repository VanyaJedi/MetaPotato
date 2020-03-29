'use strict';

const showRegistBtn = document.querySelector('.start-auth__register-btn');
const blockLogin = document.querySelector('.start-auth__auth-block');
const blockRegist = document.querySelector('.start-auth__regist-block');
const backToLoginBtn = document.querySelector('.start-auth__back-btn');

showRegistBtn.addEventListener('click', function () {
    blockLogin.classList.add('hidden');
    blockRegist.classList.remove('hidden');
});

backToLoginBtn.addEventListener('click', function () {
    blockLogin.classList.remove('hidden');
    blockRegist.classList.add('hidden');
});

console.log(document.querySelector('.start-auth__input :last-child'))