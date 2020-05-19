
//import "./modules/visual.js";
import hubConnection from "./modules/signalR.js";

import ChatController from "./controllers/chatController.js";
import MenuController from "./controllers/menuController.js";

import Api from "./api/api.js";


/*import { render } from "./utils/manipulateDOM.js";
import Message from "./components/messageComponent.js";

import requestToSever from "./utils/ajax.js";

const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
const typeArea = document.querySelector('.messages__typeArea');
const userList = document.querySelectorAll('.users__item');

const URL_TEST_MESSAGES = 'Messages/Messages/';

hubConnection.on('send', function (message, username) {
    const messageComponent = new Message(message, username);
    render(messagesContainer, messageComponent);
});

const sendMessageHandler = () => {
    const textMessage = typeArea.innerText;
    if (!textMessage) {
        return;
    }
    hubConnection.invoke('Send', textMessage, this.dataset.chatroom);
    typeArea.innerText = '';
    const messageComponent = new Message(textMessage, "Это я");
    render(messagesContainer, messageComponent);
};

sendBtn.addEventListener('click', sendMessageHandler);

hubConnection.start();

const renderMessages = function (messages) {
    messagesContainer.innerHTML = '';
    messages.forEach((message) => {
        const messageComponent = new Message(message.MessageText, message.UserName);
        render(messagesContainer, messageComponent);
    });
};

const showMessagesHandler = function (evt) {
    const chatRoomId = this.dataset.chatroom;
    hubConnection.invoke('JoinGroup', chatRoomId);
    const url = `${URL_TEST_MESSAGES}?chatRoomId=${chatRoomId}`;
    requestToSever(url, 'GET', 'json', {}, 10000, renderMessages);
};

Array.from(userList).forEach((userItem) => {
    userItem.addEventListener('click', showMessagesHandler);
});
*/

const api = new Api();
const chatController = new ChatController(hubConnection, api);
const menuController = new MenuController();

menuController.setMenuHandlers();
menuController.subsribeMenuMediaEvents();

chatController.subscribeChatMediaEvents();
chatController.startHub();
