﻿import AbstractComponent from "./abstractComponent.js";

export default class Message extends AbstractComponent {

    getTemplate() {

        return (
            `<form class="messages__send-form">
                <button class="button-icon messages__smile-btn" type="button">
                    <svg class="button-icon__svg" widht="23" height="23" aria-label="Смайл">
                        <use xlink:href="build/symbol/sprite.svg#face"></use>
                    </svg>
                </button>
                <div class="messages__typeArea" contenteditable="true"></div>
                <button class="button-icon messages__send-btn" type="button">
                    <svg class="button-icon__svg" widht="23" height="23" aria-label="Отправить">
                        <use xlink:href="build/symbol/sprite.svg#send"></use>
                    </svg>
                </button>
            </form>
            `
        );
    }

    setSendMessageHandler(handler) {
        this.getElement().querySelector('.messages__send-btn').addEventListener('click', handler);
    }

    getMessageContent() {
        return this.getElement().querySelector('.messages__typeArea').innerText;
    }

    clearTypeArea() {
        this.getElement().querySelector('.messages__typeArea').innerText = '';
    }
}

