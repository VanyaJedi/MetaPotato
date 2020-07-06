import Menu from '../components/menuComponent';
import MyProfile from '../components/myProfileComponent';
import Navigation from '../components/navigationComponent';
import { render, remove } from '../utils/manipulateDOM';
import router from '../modules/router';

const mainElem = document.querySelector('.master-main');

export default class MenuController {
    constructor(messagesModel) {
        this._messagesModel = messagesModel;
        this._menuComponent = new Menu();
        this._navigation = new Navigation();
        this._myProfile = null;

        this.closeMyProfile = this.closeMyProfile.bind(this);
        this.openProfileHandler = this.openProfileHandler.bind(this);
        this.closeProfileHandler = this.closeProfileHandler.bind(this);
        this.init = this.init.bind(this);
    }

    getNavigationItems() {
        return this._navigation.navItems;
    }

    openProfileHandler() {
        this.renderMyProfile();
        this._myProfile.setCloseUserProfileHandler(this.closeProfileHandler);
    }

    closeProfileHandler() {
        if (this._myProfile) {
            remove(this._myProfile);
            this._myProfile = null;
        }
    }

    renderMyProfile() {
        if (!this._myProfile) {
            this.hideDropMenu();
            this._myProfile = new MyProfile(this._messagesModel.myLogin);
            render(mainElem, this._myProfile);
        }
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

    init(changePagehandler) {
        this._menuComponent.setMyProfileOpenHandler(this.openProfileHandler);
        this._navigation.setNavClickHandler(changePagehandler);
    }
}
