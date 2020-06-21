import { hideElement, showElement } from '../utils/manipulateDOM';
import Auth from '../components/authComponent';

export default class AuthController {
    constructor() {
        this.auth = new Auth();
    }

    showRegister() {
        hideElement(this.auth.loginBlock);
        showElement(this.auth.registerBlock);
    }

    showForgotPass() {
        hideElement(this.auth.loginBlock);
        showElement(this.auth.forgotBlock);
    }

    backToLoginFromRegist() {
        hideElement(this.auth.registerBlock);
        showElement(this.auth.loginBlock);
    }

    backToLoginFromForgot() {
        hideElement(this.auth.forgotBlock);
        showElement(this.auth.loginBlock);
    }

    setAuthHandlers() {
        this.auth.setShowRegistHandler(this.showRegister.bind(this));
        this.auth.setBackToLoginFromRegistrHandler(this.backToLoginFromRegist.bind(this));
        this.auth.setShowForgotPassHandler(this.showForgotPass.bind(this));
        this.auth.setBackToLoginFromAuthHandler(this.backToLoginFromForgot.bind(this));
    }
}
