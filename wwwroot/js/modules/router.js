
export default class Router {
    constructor() {
        this.routes = [];
        this.root = '/';
    }

    add(path, cb) {
        this.routes.push({ path, cb });
        return this;
    }

    remove(path) {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }

    flush() {
        this.routes = [];
        return this;
    }

    getCurrentPath() {
       return window.location.pathname;
    }

    navigate(path = '') {
        window.history.pushState(null, null, this.root + path);
    }
}
