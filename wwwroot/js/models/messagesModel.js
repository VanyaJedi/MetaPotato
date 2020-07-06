import AbstractModel from './abstractModel';

export default class MessagesModel extends AbstractModel {
    constructor() {
        super();
        this._usersList = null;
        this.myLogin = null;
        this.currentChatLogin = null;
        this.currentChatRoom = null;

        this._messagesList = [];
    }

    get messages() {
        return this._messagesList;
    }

    set messages(arr) {
        this._messagesList = arr;
    }

    get users() {
        return this._usersList;
    }

    set users(arr) {
        this._usersList = arr;
    }

    getDefaultData() {
        const defaultData = {};
        if (this.users[0]) {
            defaultData.chatRoom = this.users[0].FChatRoom;
            defaultData.userName = this.users[0].FLogin;
            defaultData.userAvatar = this.users[0].FPhoto;
        }
        return defaultData;
    }

    updateMessages(messagesList) {
        this.messages = messagesList;
        this.executeAllDataChangeHandlers();
    }

    updateUsers(usersList) {
        this._usersList = usersList;
    }


}