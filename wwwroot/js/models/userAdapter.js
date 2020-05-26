
export default class UserAdapter {
    constructor(user) {
        this.userLogin = user.FLogin;
        this.lastMessage = user.FLastMessage;
        this.lastMessageDateTime = user.FLastDateTime;
        this.userAvatar = user.FPhoto;
        this.chatRoom = user.FChatRoom;
    }

    static parseUser(user) {
        return new UserAdapter(user);
    }
}
