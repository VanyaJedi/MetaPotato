
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import "./modules/visual.js";
import { mediaService } from "./modules/mediaService.js";
import hubConnection from "./modules/signalR.js";
import { render } from "./utils/manipulateDOM.js";
import Message from "./modules/message.js";

const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
const typeArea = document.querySelector('.messages__typeArea');

hubConnection.on('send', function (message, username) {
    const messageComponent = new Message(message, username);
    render(messagesContainer, messageComponent);
});

const sendMessageHandler = () => {
    console.log(typeArea.innerText);
    const textMessage = typeArea.innerText;
    if (!textMessage) {
        return;
    }
    hubConnection.invoke('JoinGroup', '1');
    hubConnection.invoke('Send', textMessage, '1');
    typeArea.innerText = '';
    const messageComponent = new Message(textMessage, "Это я");
    render(messagesContainer, messageComponent);
}

sendBtn.addEventListener('click', sendMessageHandler);

hubConnection.start();