
class Router {
    constructor() {
        this.routes = [];
        this.root = '/';

        this.navigate = this.navigate.bind(this);
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

    getClearInputHref(href) {
        const re = /(?:https?:\/\/)?.*\/(\w*)/;
        const clearedHref = href.match(re);
        return clearedHref[1];
    }

    getCurrentPath() {
        const path = window.location.pathname;
        return path.replace('/', '');
    }

    navigate(path = '') {
        const clearPath = this.getClearInputHref(path);
        window.history.pushState(null, null, this.root + clearPath);
        return clearPath;
    }
}

const router = new Router();
export default router;
