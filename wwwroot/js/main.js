
//import "./modules/visual.js";
import hubConnection from "./modules/signalR.js";

import ChatController from "./controllers/chatController.js";
import MenuController from "./controllers/menuController.js";

import Api from "./api/api.js";

const api = new Api();
const chatController = new ChatController(hubConnection, api);
const menuController = new MenuController();

menuController.setMenuHandlers();
menuController.subsribeMenuMediaEvents();

 chatController.subscribeChatMediaEvents();
 chatController.startHub();


