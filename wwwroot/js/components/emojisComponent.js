import AbstractComponent from './abstractComponent';

export default class Emojis extends AbstractComponent {
    constructor(emojis) {
        super();
        this._emojis = emojis.slice(0, 150);
        this.isRender = false;
    }

    renderEmojis() {
        return this._emojis.map((emoji) => `<span class="emoji">${emoji.char}</span>`).join('');
    }

    setEmojiClickHandler(handler) {
        this.getElement().addEventListener('click', handler);
    }

    getTemplate() {
        return (
            `<div class="emojis">
                ${this.renderEmojis()}
             </div>
            `
        );
    }
}
