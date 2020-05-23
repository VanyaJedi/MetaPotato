
//import "./modules/visual.js";
import hubConnection from "./modules/signalR.js";

import ChatController from "./controllers/chatController.js";
import MenuController from "./controllers/menuController.js";

import Api from "./api/api.js";

const api = new Api();

const menuController = new MenuController();
menuController.setMenuHandlers();
menuController.subsribeMenuMediaEvents();

const isChatPage = !!document.querySelector('.messenger');
if (isChatPage) {
    const chatController = new ChatController(hubConnection, api);
    chatController.subscribeChatMediaEvents();
    chatController.startHub();
}



