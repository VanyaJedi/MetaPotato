
import AbstractComponent from './abstractComponent';

const loginBlock = document.querySelector('.start-auth__auth-block');
const registerBlock = document.querySelector('.start-auth__regist-block');
const forgotBlock = document.querySelector('.start-auth__forgot-pass-block');

export default class Auth extends AbstractComponent {
    constructor() {
        super();

        this.loginBlock = loginBlock;
        this.registerBlock = registerBlock;
        this.forgotBlock = forgotBlock;

        this.showRegistBtn = loginBlock.querySelector('.start-auth__register-btn');
        this.backToLoginBtn = registerBlock.querySelector('.start-auth__back-btn');
        this.backToLoginBtnFromAuth = forgotBlock.querySelector('.start-auth__back-btn-forgot');
        this.forgotPassBtn = loginBlock.querySelector('.start-auth__forgot-pass-btn');
    }

    setShowRegistHandler(handler) {
        this.showRegistBtn.addEventListener('click', handler);
    }

    setBackToLoginFromRegistrHandler(handler) {
        this.backToLoginBtn.addEventListener('click', handler);
    }

    setShowForgotPassHandler(handler) {
        this.forgotPassBtn.addEventListener('click', handler);
    }

    setBackToLoginFromAuthHandler(handler) {
        this.backToLoginBtnFromAuth.addEventListener('click', handler);
    }
}