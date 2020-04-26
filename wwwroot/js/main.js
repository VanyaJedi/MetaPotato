
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import "./modules/visual.js";
import { mediaService } from "./modules/mediaService.js";
import hubConnection from "./modules/signalR.js";
import { render } from "./utils/manipulateDOM.js";
import Message from "./modules/message.js";

import requestToSever from "./utils/ajax.js";

const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
const typeArea = document.querySelector('.messages__typeArea');
const userList = document.querySelectorAll('.users__item');

const URL_TEST_MESSAGES = 'Messages/Messages';

hubConnection.on('send', function (message, username) {
    const messageComponent = new Message(message, username);
    render(messagesContainer, messageComponent);
});

const sendMessageHandler = () => {
    const textMessage = typeArea.innerText;
    if (!textMessage) {
        return;
    }
    hubConnection.invoke('JoinGroup', '1');
    hubConnection.invoke('Send', textMessage, '1');
    typeArea.innerText = '';
}

sendBtn.addEventListener('click', sendMessageHandler);

hubConnection.start();

const renderMessages = function (messages) {
    messagesContainer.innerHTML = '';
    messages.forEach((message) => {
        const messageComponent = new Message(message.MessageText, message.UserName);
        render(messagesContainer, messageComponent);
    });
}

const showMessagesHandler = function (evt) {
    const chatRoomId = this.dataset.chatroom;
    const url = `${URL_TEST_MESSAGES}?${chatRoomId}`;
    requestToSever(url, 'GET', 'json',  {}, 10000, renderMessages);
}

Array.from(userList).forEach((userItem) => {
    userItem.addEventListener('click', showMessagesHandler);
})

