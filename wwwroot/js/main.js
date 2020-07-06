import hubConnection from './modules/signalR';
import PageModel from './models/PageModel';
import MessagesModel from './models/messagesModel';
import PageController from './controllers/PageController';
import ChatController from './controllers/chatController';
import MenuController from './controllers/menuController';
import { generateCSSVarForCorrectMobileHeight } from './utils/other';
import router from './modules/router';
import Api from './api/api';

generateCSSVarForCorrectMobileHeight();
window.addEventListener('resize', () => {
    generateCSSVarForCorrectMobileHeight();
});

const api = new Api();
const messagesModel = new MessagesModel();
const pageModel = new PageModel(router.getCurrentPath());

api.getEmojisPack();

const pageController = new PageController(hubConnection, api, messagesModel, pageModel, router);
pageController.getInitialDataAndInitMenu();
