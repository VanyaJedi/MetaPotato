
export default class MessagesModel {
    constructor() {
        this._usersList = null;
        this.myLogin = null;
        this.currentChatLogin = null;
        this.currentChatRoom = null;

        this._messagesList = [];

        this._dataChangeHandlers = [];
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

    addDataChangeHandler(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _executeAllHandlers(handlers) {
        handlers.forEach((handler) => {
            handler();
        });
    }

    updateMessages(messagesList) {
        this.messages = messagesList;
        this._executeAllHandlers(this._dataChangeHandlers);
    }

    updateUsers(usersList) {
        this._usersList = usersList;
    }


}