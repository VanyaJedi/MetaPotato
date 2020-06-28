import { render, remove, replace } from '../utils/manipulateDOM';
import Message from '../components/messageComponent';
import Chat from '../components/chatComponent';
import UserItem from '../components/userItemComponent';
import UserProfile from '../components/userProfileComponent';
import TypeArea from '../components/typeAreaComponent';
import UserInfo from '../components/userInfoComponent';

import userAdapter from '../models/userAdapter';


const mainElement = document.querySelector('.master-main');

const messagesUser = document.querySelector('.messages__user');
const messagesBlock = document.querySelector('.messages__block');
const messagesContainer = document.querySelector('.messages__list');
const userList = document.querySelector('.users__list');


export default class ChatController {
    constructor(hub, api, messagesModel) {
        this._hub = hub;
        this._api = api;
        this._messagesModel = messagesModel;
        this._usersComponents = [];

        this._defaultData = this._messagesModel.getDefaultData();
        this._currentChat = this._defaultData.chatRoom;
        this._currentUser = this._defaultData.userName;
        this._currentPhoto = this._defaultData.userAvatar;

        this._chatComponent = new Chat();
        this._userProfile = null;
        this._userInfo = null;
        this._typeArea = null;

        this.showUserProfileHandler = this.showUserProfileHandler.bind(this);
        this.closeUserProfile = this.closeUserProfile.bind(this);
        this.sendMessageHandler = this.sendMessageHandler.bind(this);
        this.focusTypeAreaHandler = this.focusTypeAreaHandler.bind(this);
        this.blurTypeAreaHandler = this.blurTypeAreaHandler.bind(this);

        this._messagesModel.addDataChangeHandler(this.renderMessages.bind(this));
    }

    isInitialDataNotEmpty() {
        return Object.keys(this._defaultData).length > 0;
    }

    startHub() {
        this._hub.start();
        this._hub.on('send', (message, username) => {
            this.renderMessage(message, username, true);
        });
    }

    showUserProfileHandler() {
        this._userProfile = new UserProfile(this._currentUser, this._currentPhoto, this._currentChat);
        this.hideChat();
        render(mainElement, this._userProfile);
        this._userProfile.setCloseUserProfileHandler(() => {
            this.closeUserProfile();
            this.showChat();
        });
    }

    closeUserProfile() {
        if (this._userProfile) {
            remove(this._userProfile);
            this._userProfile = null;
        }
    }

    renderUsers() {
        this._messagesModel.users.forEach((user) => {
            const userItemParsed = userAdapter.parseUser(user);
            const userItem = new UserItem(userItemParsed, userList);

            const clickHandler = () => {
                const { chatRoom, userLogin, userAvatar } = userItemParsed;
                const isSameChat = (this._currentChat === chatRoom);
                if (!isSameChat) {
                    this._hub.invoke('JoinGroup', chatRoom.toString());
                    this._api.getMessages(chatRoom)
                        .then((messages) => {
                            this._currentPhoto = userAvatar;
                            this._currentChat = chatRoom;
                            this._currentUser = userLogin;
                            this._messagesModel.updateMessages(messages);
                            userItem.clearAllActive();
                            userItem.makeActive();
                            this.renderUserInfo();
                        });
                }
            };

            userItem.setUserItemClick(clickHandler);
            this._usersComponents.push(userItem);
            render(userList, userItem);
        });
    }

    renderTypeArea() {
        this._typeArea = new TypeArea();
        render(messagesBlock, this._typeArea);
        this._typeArea.setSendMessageHandler(this.sendMessageHandler);
        this._typeArea.setFocusHandler(this.focusTypeAreaHandler);
        this._typeArea.setBlurHandler(this.blurTypeAreaHandler);
    }

    sendMessageHandler() {
        const textMessage = this._typeArea.getMessageContent();
        if (!textMessage) {
            return;
        }
        this._hub.invoke('Send', textMessage, this._currentChat.toString())
            .then(() => {
                this._typeArea.clearTypeArea();
                this.renderMessage(textMessage, this._messagesModel.myLogin, false);
                this._chatComponent.scrollDownMessages();
            });
    }

    renderUserInfo() {
        this._oldUserInfo = this._userInfo;
        this._userInfo = new UserInfo(this._currentUser, this._currentPhoto, this._currentChat);
        this._userInfo.setOpenProfileHandler(this.showUserProfileHandler);

        if (this._oldUserInfo) {
            replace(this._userInfo, this._oldUserInfo);
        } else {
            render(messagesUser, this._userInfo);
        }
    }

    renderInitialData() {
        this._api.getMessages(this._currentChat)
            .then((messages) => {
                if (this.isInitialDataNotEmpty()) {
                    this.renderUsers();
                    this._messagesModel.updateMessages(messages);
                    this._chatComponent.scrollDownMessages();
                    if (this._usersComponents.length) {
                        this._usersComponents[0].makeActive();
                    }
                    this.renderUserInfo();
                    this.renderTypeArea();
                    this._chatComponent.setScreenHandlers();
                }
            });
    }

    renderMessage(message, userName, userAvatar, isFriend) {
        const messageComponent = new Message(message, userName, userAvatar, isFriend);
        render(this._chatComponent.messagesList, messageComponent);
    }

    renderMessages() {
        messagesContainer.innerHTML = '';
        this._messagesModel.messages.forEach((message) => {
            this.renderMessage(message.MessageText, message.UserName, this._currentPhoto, message.IsFriend);
        });
    }

    subscribeChatMediaEvents() {
        this._chatComponent.subscribeMediaEvents();
    }

    hideChat() {
        this._chatComponent.hide();
    }

    showChat() {
        this._chatComponent.show();
    }

    focusTypeAreaHandler() {
        this._sendByEnterKeyHandler = (evt) => {
            const isEnter = (evt.key === 'Enter');
            if (isEnter) {
                evt.preventDefault();
                this.sendMessageHandler();
            }
        };
        document.addEventListener('keydown', this._sendByEnterKeyHandler);
    }

    blurTypeAreaHandler() {
        document.removeEventListener('keydown', this._sendByEnterKeyHandler);
    }
}
