

export default class MessagesModel {

    constructor() {
        this.myLogin = null;
        this.currentChatLogin = null;
        this.currentChatRoom = 1;

        this._messagesList = [];

        this._dataChangeHandlers = [];
    }

    get messages() {
        return this._messagesList;
    }

    set messages(arr) {
        this._messagesList = arr;
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


}