﻿import hubConnection from './modules/signalR';
import MessagesModel from './models/messagesModel';
import ChatController from './controllers/chatController';
import MenuController from './controllers/menuController';
import Api from './api/api';

const api = new Api();
const messagesModel = new MessagesModel();


api.getInitialData()
    .then((data) => {
        messagesModel.users = data.ContactItems;
        messagesModel.myLogin = data.FMyLogin;

        const menuController = new MenuController(messagesModel);
        menuController.setMenuHandlers();
        menuController.subsribeMenuMediaEvents();

        const chatController = new ChatController(hubConnection, api, messagesModel);
        chatController.startHub();
        chatController.renderInitialData();
        chatController.subscribeChatMediaEvents();

        const closeMyProfileHandler = () => {
            chatController.showChat();
            menuController.closeMyProfile();
        };

        const openMyProfileHandler = () => {
            menuController.renderMyProfile();
            chatController.hideChat();
            menuController.setCloseProfileHandler(closeMyProfileHandler);
        };

        menuController.setOpenProfileHandler(openMyProfileHandler);
    });
