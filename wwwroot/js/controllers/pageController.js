
import ChatController from './chatController';
import MenuController from './menuController';
import { generateCSSVarForCorrectMobileHeight, removeAllClasses } from '../utils/other';

generateCSSVarForCorrectMobileHeight();
window.addEventListener('resize', () => {
    generateCSSVarForCorrectMobileHeight();
});

export default class PageController {
    constructor(hubConnection, api, messagesModel, pageModel, router) {
        this._hub = hubConnection;
        this._router = router;
        this._api = api;
        this._messagesModel = messagesModel;
        this._pageModel = pageModel;
        this._chatController = null;
        this._menuController = new MenuController(this._messagesModel);
        this.changePageHandler = this.changePageHandler.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this._pageModel.addDataChangeHandler(this.renderPage);
        // event push go back or forward button
        window.onpopstate = this.renderPage;
    }

    removeChatPage() {
        this._chatController.removeChat();
        this._chatController = null;
    }

    changePageHandler(evt) {
        evt.preventDefault();
        const navItems = this._menuController.getNavigationItems();
        removeAllClasses(navItems, 'navigation__item--active');
        const targetNavItem = evt.target.closest('a');
        targetNavItem.classList.add('navigation__item--active');
        const navLink = evt.target.closest('a').href;
        const address = this._router.navigate(navLink);
        this._pageModel.updatePage(address);
    }

    getInitialDataAndInitMenu() {
        const navItems = this._menuController.getNavigationItems();
        navItems.forEach((item) => {
            if (this._router.getClearInputHref(item.href) === this._router.getCurrentPath()) {
                item.classList.add('navigation__item--active');
            }
        });
        this._api.getInitialData()
            .then((data) => {
                this._messagesModel.users = data.ContactItems;
                this._messagesModel.myLogin = data.FMyLogin;
                this._menuController.init(this.changePageHandler);
                this.renderPage();
            });
    }

    renderMessagePage() {
        if (!this._chatController) {
            this._chatController = new ChatController(this._hub, this._api, this._messagesModel);
            if (!this._hub.connectionStarted) {
                this._chatController.startHub();
            }
        }
        this._chatController.renderInitialData();
    }

    renderPage() {
        switch (this._router.getCurrentPath()) {
        case '':
            if (this._chatController) {
                this.removeChatPage();
            }
            break;
        case 'messenger':
            this.renderMessagePage();
            break;
        default:
            break;
        }
    }


}