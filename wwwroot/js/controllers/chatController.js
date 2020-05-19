import hubConnection from "../modules/signalR.js";
import { render } from "../utils/manipulateDOM.js";
import Message from "../components/messageComponent.js";
import Chat from "../components/chatComponent.js";
import Api from "../api/api.js";

const usersElement = document.querySelector('.users'); //Razor rendering
const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
const typeArea = document.querySelector('.messages__typeArea');
const userList = document.querySelector('.users__list');

const URL_TEST_MESSAGES = 'Messages/Messages/'

export default class ChatController {

    constructor(hub, api) {
        this._hub = hub;
        this._api = api;

        this._currentChat = 1; //временный дефолтный чатрум, далее нужно брать при загрузки с сервера последний чат

        this._chatComponent = new Chat();

        this.getAndRenderMessagesHandler = this.getAndRenderMessagesHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.setHandlers(); // hang up all handlers at initialization 
    }

    startHub() {
        this._hub.start();

        this._hub.on('send', (message, username) => {
            const messageComponent = new Message(message, username);
            render(messagesContainer, messageComponent);
        });
    }


    renderMessages(messages) {
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            const messageComponent = new Message(message.MessageText, message.UserName);
            render(messagesContainer, messageComponent);
        });
    }


    getAndRenderMessagesHandler(evt) {
        const targetUserElement = evt.target.closest('.users__item');
        if (targetUserElement) {
            const chatRoomId = targetUserElement.dataset.chatroom;
            const isSameChat = (chatRoomId === this._currentChat);
            if (!isSameChat) {
                messagesContainer.innerHTML = '';
                this._hub.invoke('JoinGroup', chatRoomId);
                this._api.getMessages(chatRoomId).
                    then((messages) => {
                        this._currentChat = chatRoomId;
                        this.renderMessages(messages);
                    })
            }
        }
    }

    setChatRoomSelectHandler() {
        this._chatComponent.setUserItemClickHandler(this.getAndRenderMessagesHandler);
    }

    subscribeChatMediaEvents() {
        this._chatComponent.subscribeMediaEvents();
    }


    sendMessage() {
        const textMessage = this._chatComponent.typeArea.innerText;
        if (!textMessage) {
            return;
        }
        this._hub.invoke('Send', textMessage, this._currentChat).
            then(() => {
                typeArea.innerText = '';
                const messageComponent = new Message(textMessage, "Это я");
                render(this._chatComponent.messagesList, messageComponent);
            });
    }

    setSendMessageHandler() {
        this._chatComponent.setSendMessageHandler(this.sendMessage);
    }

    setHandlers() {
        this._chatComponent.setScreenHandlers();
        this.setChatRoomSelectHandler();
        this.setSendMessageHandler();
    }


}