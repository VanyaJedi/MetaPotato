
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import "./modules/visual.js";
import { mediaService } from "./modules/mediaService.js";
import hubConnection from "./modules/signalR.js";
import { render } from "./utils/manipulateDOM.js";
import Message from "./modules/message.js";

const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
hubConnection.on('send', function () {
    render(messagesContainer, new Message());
});

const sendMessageHandler = () => {
    console.log(`1`);
    hubConnection.invoke('JoinGroup', '1');
    hubConnection.invoke('Send', 'тестовое сообщение', '1');
}

sendBtn.addEventListener('click', sendMessageHandler);

hubConnection.start();