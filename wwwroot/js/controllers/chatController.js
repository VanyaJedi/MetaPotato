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

        if (this._chatComponent) {
            console.log(this._chatComponent);
            this.isAvailable = true;
        } else {
            this.isAvailable = false;
        }

        this.getAndRenderMessagesHandler = this.getAndRenderMessagesHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.setHandlers(); // hang up all handlers at initialization 
    }

    startHub() {
        this._hub.start();

         this._hub.on('send', (message, username) => {
             this.renderMessage(message, username, true);
        });

    }


    renderMessage(message, userName, isFriend) {
        const messageComponent = new Message(message, userName, isFriend);
        render(this._chatComponent.messagesList, messageComponent);
    }

    renderMessages(messages) {
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            this.renderMessage(message.MessageText, message.UserName, message.IsFriend);
        });
    }


    getAndRenderMessagesHandler(evt) {
        const targetUserElement = evt.target.closest('.users__item');
        if (targetUserElement) {
            const chatRoomId = targetUserElement.dataset.chatroom;
            const targetUserName = targetUserElement.dataset.username;
            const isSameChat = (chatRoomId === this._currentChat);
            if (!isSameChat) { 
                this._hub.invoke('JoinGroup', chatRoomId);
                this._api.getMessages(chatRoomId).
                    then((messages) => {
                        this._chatComponent.setActiveUser(evt);
                        this._chatComponent.refreshUserName(targetUserName);
                        messagesContainer.innerHTML = '';
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
                this.renderMessage(textMessage, 'me', false);
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