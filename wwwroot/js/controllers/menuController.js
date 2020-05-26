import Menu from '../components/menuComponent';
import MyProfile from '../components/myProfileComponent';
import { render, remove } from '../utils/manipulateDOM';

const mainElem = document.querySelector('.master-main');

export default class MenuController {
    constructor(messagesModel) {
        this._messagesModel = messagesModel;
        this._menuComponent = new Menu();
        this._myProfile = null;

        this.closeMyProfile = this.closeMyProfile.bind(this);
        this.setOpenProfileHandler = this.setOpenProfileHandler.bind(this);
        this.setCloseProfileHandler = this.setCloseProfileHandler.bind(this);
    }

    setMenuHandlers() {
        this._menuComponent.setScreenHandlers();
    }

    subsribeMenuMediaEvents() {
        this._menuComponent.subscribeMediaEvents();
    }

    getProfileBtn() {
        return this._menuComponent.getElement().querySelector('.menu__nav-item-profile');
    }

    setOpenProfileHandler(handler) {
        this._menuComponent.setMyProfileOpenHandler(handler);
    }

    setCloseProfileHandler(handler) {
        this._myProfile.setCloseUserProfileHandler(handler);
    }

    renderMyProfile() {
        if (!this._myProfile) {
            this.hideDropMenu();
            this._myProfile = new MyProfile(this._messagesModel.myLogin);
            render(mainElem, this._myProfile);
        }
        //this._myProfile.setCloseUserProfileHandler(this.closeMyProfile);
    }

    closeMyProfile() {
        if (this._myProfile) {
            remove(this._myProfile);
            this._myProfile = null;
        }
    }

    hideDropMenu() {
        this._menuComponent.showMenuDesktopHandler();
    }
}
