
//import "./modules/visual.js";
import hubConnection from "./modules/signalR.js";

import MessagesModel from "./models/messagesModel.js";

import ChatController from "./controllers/chatController.js";
import MenuController from "./controllers/menuController.js";

import Api from "./api/api.js";

const api = new Api();
const messagesModel = new MessagesModel();
const menuController = new MenuController();

const renderInitial = (chatController) => {
    //const chatController = new ChatController(hubConnection, api, messagesModel);
    console.log(chatController._hub);
    chatController.renderUsers();
    chatController.renderInitialData();
}

api.getInitialData().
    then((data) => {
        console.log(data);
        messagesModel.users = data.ContactItems;
        console.log(messagesModel.users);
          
        /*messagesModel.currentChatLogin = data.FUser;
        messagesModel.currentChatRoom = data.FChatRoom;*/
       // messagesModel.myLogin = data.FMyLogin;

       // menuController.setMenuHandlers();
       // menuController.subsribeMenuMediaEvents();

        const chatController = new ChatController(hubConnection, api, messagesModel);
        chatController.startHub();
        renderInitial(chatController);
        //chatController.renderUsers();
        //  chatController.renderInitialData();
        //chatController.subscribeChatMediaEvents();
        
    });








