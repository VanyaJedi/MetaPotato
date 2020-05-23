
//import "./modules/visual.js";
import hubConnection from "./modules/signalR.js";

import MessagesModel from "./models/messagesModel.js";

import ChatController from "./controllers/chatController.js";
import MenuController from "./controllers/menuController.js";

import Api from "./api/api.js";

const api = new Api();
const messagesModel = new MessagesModel();


const menuController = new MenuController();
menuController.setMenuHandlers();
menuController.subsribeMenuMediaEvents();

const chatController = new ChatController(hubConnection, api, messagesModel);
chatController.subscribeChatMediaEvents();
chatController.startHub();




