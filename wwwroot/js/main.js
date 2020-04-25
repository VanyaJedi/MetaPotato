
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

hubConnection.on('send', function () {
    render(messagesContainer, new Message());
});

const sendMessageHandler = () => {
<<<<<<< HEAD
    console.log(`1`);
=======
    const textMessage = typeArea.innerText;
    if (textMessage) {
        return;
    }
>>>>>>> 20416814edd8ea1f291f3d31cf157de0fab54d81
    hubConnection.invoke('JoinGroup', '1');
    hubConnection.invoke('Send', textMessage, '1');
    textMessage.innerText = '';
}

sendBtn.addEventListener('click', sendMessageHandler);

hubConnection.start();