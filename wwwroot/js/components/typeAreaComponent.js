import AbstractComponent from './abstractComponent';

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

    setFocusHandler(handler) {
        this.getElement().querySelector('.messages__typeArea').addEventListener('focus', handler);
    }

    setBlurHandler(handler) {
        this.getElement().querySelector('.messages__typeArea').addEventListener('blur', handler);
    }

    setShowEmojiHandler(handler) {
        this.getElement().querySelector('.messages__smile-btn').addEventListener('click', handler);
    }

    addContent(content) {
        console.log(content);
        this.getElement().querySelector('.messages__typeArea').innerHTML += content;
    }
}
