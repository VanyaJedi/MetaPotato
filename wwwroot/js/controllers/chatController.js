import hubConnection from "../modules/signalR.js";
import { render, remove } from "../utils/manipulateDOM.js";
import Message from "../components/messageComponent.js";
import Chat from "../components/chatComponent.js";
import UserProfile from "../components/userProfileComponent";
import Api from "../api/api.js";


const mainElement = document.querySelector('.master-main');

const usersElement = document.querySelector('.users');
const messagesContainer = document.querySelector('.messages__list');
const sendBtn = document.querySelector('.messages__send-btn');
const typeArea = document.querySelector('.messages__typeArea');
const userList = document.querySelector('.users__list');

const URL_TEST_MESSAGES = 'Messages/Messages/'

export default class ChatController {

    constructor(hub, api, messagesModel) {
        this._hub = hub;
        this._api = api;
        this._messagesModel = messagesModel;

        this._currentChat = this._messagesModel.currentChatLogin; //временный дефолтный чатрум, далее нужно брать при загрузки с сервера последний чат

        this._chatComponent = new Chat();
        this._userProfile = null;
        this.getAndRenderMessagesHandler = this.getAndRenderMessagesHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showUserProfileHandler = this.showUserProfileHandler.bind(this);
        this.closeUserProfile = this.closeUserProfile.bind(this);

        this.setHandlers(); // hang up all handlers at initialization 

        this._messagesModel.addDataChangeHandler(this.renderMessagesEvent.bind(this));
    }

    startHub() {
        this._hub.start();

        this._hub.on('send', (message, username) => {
            this.renderMessage(message, username, true);
        });

    }

    showUserProfileHandler(evt) {
        //const isCorrectTargetElement = evt.target.classList.contains('users__name') || evt.target.classList.contains('users__avatar');
        if (!this._chatComponent.isClickTargetMeansToShowChat(evt)) {
            const targetUserElement = evt.target.closest('.users__item');
            const userName = targetUserElement.dataset.username;
            this._userProfile = new UserProfile(userName);
            this._chatComponent.hide();
            render(mainElement, this._userProfile);
            this._userProfile.setCloseUserProfileHandler(this.closeUserProfile);
        }

    }

    renderInitialData() {
        this._api.getMessages(this._messagesModel.currentChatRoom).
            then((messages) => {
                this._chatComponent.setActiceUserInitial();
                this._chatComponent.refreshUserName(this._messagesModel.currentChatLogin);
                this._messagesModel.updateMessages(messages);
            })
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


    renderMessagesEvent() {
        messagesContainer.innerHTML = '';
        this.renderMessages(this._messagesModel.messages);
    }

    getAndRenderMessagesHandler(evt) {
        if (this._chatComponent.isClickTargetMeansToShowChat(evt)) {
            const targetUserElement = evt.target.closest('.users__item');
            const chatRoomId = targetUserElement.dataset.chatroom;
            const targetUserName = targetUserElement.dataset.username;
            const isSameChat = (chatRoomId === this._messagesModel.currentChat);
            if (!isSameChat) {
                this._hub.invoke('JoinGroup', chatRoomId);
                this._api.getMessages(chatRoomId).
                    then((messages) => {
                        this._messagesModel.updateMessages(messages);
                        this._chatComponent.setActiveUser(evt);
                        this._chatComponent.refreshUserName(targetUserName);
                        this._currentChat = chatRoomId;
                    })
            }
        }
    }





    closeUserProfile() {
        if (this._userProfile) {
            remove(this._userProfile);
            this._chatComponent.show();
        }    
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
                this._chatComponent.scrollDownMessages();
            });
    }


    setHandlers() {
        this._chatComponent.setScreenHandlers();
        this._chatComponent.setUserItemClickHandler(this.getAndRenderMessagesHandler);
        this._chatComponent.setUserItemClickHandler(this.showUserProfileHandler);
        this._chatComponent.setSendMessageHandler(this.sendMessage);
    }


}