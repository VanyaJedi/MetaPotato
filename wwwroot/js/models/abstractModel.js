export default class AbstractModel {
    constructor() {
        this.dataChangeHandlers = [];
    }

    addDataChangeHandler(handler) {
        this.dataChangeHandlers.push(handler);
    }

    executeAllDataChangeHandlers() {
        this.dataChangeHandlers.forEach((handler) => {
            handler();
        });
    }
}
