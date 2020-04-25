import { createElement } from "../utils/manipulateDOM.js";

export default class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
        }

        this._element = null;
    }

    getTemplate() {
        throw new Error(`getTemplate method should exist`);
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}
