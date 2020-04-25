import AbstractComponent from "./abstractComponent.js";
import hubConnection from "./signalR.js"

export default class Message extends AbstractComponent {

    getTemplate() {
        return (
            `<li class="message messages__item">
                <div class="message__user">
                    <img src="img/default_avatar.png" />
                    <span class="message__name">Test user</span>
                </div>
                <div class="message__content">
                    <span>Тестовое сообщение</span>
                </div>
            </li>
            `
        );
    }
}

