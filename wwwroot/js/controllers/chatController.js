import hubConnection from "../modules/signalR.js";
import { render, remove } from "../utils/manipulateDOM.js";
import Message from "../components/messageComponent.js";
import Chat from "../components/chatComponent.js";
import UserItem from "../components/userItemComponent.js";
import UserProfile from "../components/userProfileComponent.js";
import TypeArea from "../components/typeAreaComponent.js";
import Api from "../api/api.js";

import userAdapter from "../models/userAdapter.js";


const mainElement = document.querySelector('.master-main');

const usersElement = document.querySelector('.users');
const messagesBlock = document.querySelector('.messages__block');
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
        this._usersComponents = [];

        this._defaultData = this._messagesModel.getDefaultChatRoomAndUser();
        this._currentChat = this._defaultData.chatRoom;
        this._currentUser = this._defaultData.userName;

        this._chatComponent = new Chat();
        this._userProfile = null;
      //  this.getAndRenderMessagesHandler = this.getAndRenderMessagesHandler.bind(this);
      //  this.sendMessage = this.sendMessage.bind(this);
      //  this.showUserProfileHandler = this.showUserProfileHandler.bind(this);
      //  this.closeUserProfile = this.closeUserProfile.bind(this);
        //this.setHandlers(); // hang up all handlers at initialization 

        this._messagesModel.addDataChangeHandler(this.renderMessagesEvent.bind(this));
    }

    startHub() {
        this._hub.start().
            then((result) => {
                console.log(result);
            })
        this._hub.on('send', (message, username) => {
            this.renderMessage(message, username, true);
        });

    }

    /*showUserProfileHandler(evt) {
        //const isCorrectTargetElement = evt.target.classList.contains('users__name') || evt.target.classList.contains('users__avatar');
        if (!this._chatComponent.isClickTargetMeansToShowChat(evt)) {
            const targetUserElement = evt.target.closest('.users__item');
            const userName = targetUserElement.dataset.username;
            this._userProfile = new UserProfile(userName);
            this._chatComponent.hide();
            render(mainElement, this._userProfile);
            this._userProfile.setCloseUserProfileHandler(this.closeUserProfile);
        }

    }*/



    renderUsers() {
        console.log(this._hub);
        this._messagesModel.users.forEach((user) => {
            const userItemParsed = userAdapter.parseUser(user);
            const userItem = new UserItem(userItemParsed, userList);
            const clickHandler = () => {
                const chatRoom = userItemParsed.chatRoom;
                const userName = userItemParsed.userName;
                const isSameChat = (this._currentChat === chatRoom);
                if (!isSameChat) {
                    this._hub.invoke('JoinGroup', chatRoom);
                    this._api.getMessages(chatRoom).
                        then((messages) => {
                            this._messagesModel.updateMessages(messages);
                            userItem.clearAllActive();
                            userItem.makeActive();
                            //this._chatComponent.setActiveUser(evt);
                            //this._chatComponent.refreshUserName(targetUserName);
                            this._currentChat = chatRoom;
                        })
                }
            }

            userItem.setUserItemClick(clickHandler);
            this._usersComponents.push(userItem);
            render(userList, userItem);
        })
    }


    renderTypeArea() {
        const typeArea = new TypeArea();
        render(messagesBlock, typeArea);

        const sendMessageHandler = () => {
            const textMessage = typeArea.getMessageContent();
            if (!textMessage) {
                return;
            }
            console.log(this._currentChat);
            this._hub.invoke('Send', textMessage, this._currentChat).
                then(() => {
                    typeArea.clearTypeArea();
                    this.renderMessage(textMessage, this._messagesModel.myLogin, false);
                    this._chatComponent.scrollDownMessages();
                }).
                catch((err) => {
                    console.log(err);
                })
        }

        typeArea.setSendMessageHandler(sendMessageHandler);
    }

    /*sendMessage() {
        const textMessage = this._chatComponent.typeArea.innerText;
        if (!textMessage) {
            return;
        }
        this._hub.invoke('Send', textMessage, this._currentChat).
            then(() => {
                typeArea.innerText = '';
                this.renderMessage(textMessage, this._messagesModel.myLogin, false);
                this._chatComponent.scrollDownMessages();
            }).
            catch((err) => {
                console.log(err);
            })
    }*/

   

    renderInitialData() {
        console.log(this._messagesModel.currentChatRoom);
        this._api.getMessages(this._currentChat).
            then((messages) => {
                this._chatComponent.refreshUserName(this._messagesModel.currentChatLogin);
                this._messagesModel.updateMessages(messages);
                this._usersComponents[0].makeActive();
                this.renderTypeArea();
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




   /* setHandlers() {
        this._chatComponent.setScreenHandlers();
        this._chatComponent.setUserItemClickHandler(this.getAndRenderMessagesHandler);
        this._chatComponent.setUserItemClickHandler(this.showUserProfileHandler);
        this._chatComponent.setSendMessageHandler(this.sendMessage);
    }*/


}