import AbstractModel from './abstractModel';

export default class PageModel extends AbstractModel {
    constructor(currentPage) {
        super();
        this.currentPage = currentPage;
    }

    setCurrentPage(address) {
        this.currentPage = address;
    }

    updatePage(address) {
        if (address !== this.currentPage) {
            this.currentPage = address;
            this.executeAllDataChangeHandlers();
        }
    }
}
