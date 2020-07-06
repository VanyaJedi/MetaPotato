
import { render } from '../utils/manipulateDOM';

export default class PageChangeService {
    constructor() {
        this._currentPage = null;
    }

    renderPage(id, container, rootElem, initFunc) {
        this._currentPage = id;
        render(container, rootElem);
        initFunc();
    }
}