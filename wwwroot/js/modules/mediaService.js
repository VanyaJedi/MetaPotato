class MediaService {
    constructor(settings) {
        this.subscriptionsByScreenSize = {};
        this.subscriptionsById = {};
        settings.forEach(({ key, matchMedia }) => {
            this.addMatchMedia(key, matchMedia)
        })
    }

    static getListenerNameByKey() {
        return `mql-${key}`;
    }

    addMatchMedia(key, matchMedia) {
        if (this.isScreenTypeExist(key)) {
            throw new Error(`The key already exists: ${key}`)
        }
        const name = MediaService.getListenerNameByKey(key);
        this[name] = window.matchMedia(matchMedia)
        this[name].addListener(this._listener(key).bind(this))
        this.subscriptionsByScreenSize[key] = []
    }

    removeMatchMedia() {
        if (!this.isScreenTypeExist(key)) {
            return;
        }
        const name = MediaService.getListenerNameByKey();
        delete this[name];
        const ids = this.subscriptionsByScreenSize[key];
        ids.forEach(id => {
            delete this.subscriptionsById[id];
        });
        delete this.subscriptionsByScreenSize[key];
    }

    _listener(key) {
        return (evt) => {
            if (evt.matches) {
                this.subscriptionsByScreenSize[key].forEach(id => {
                    this.subscriptionsById[id].whenHappens();
                })
            } else {
                this.subscriptionsByScreenSize[key].forEach(id => {
                    this.subscriptionsById[id].whenNotHappens();
                })
            }
        }
    }

    //метод удаления id из массива по размеру экрана
    _deleteIdByScreenSize(id) {
        for (const screen of Object.keys(this.subscriptionsByScreenSize)) {
            const subscription = this.subscriptionsByScreenSize[screen];
            if (subscription.includes(id)) {
                subscription.splice(subscription.indexOf(id), 1);
                break;
            }
        }
    }

    isScreenTypeExist {
        return !!this.subscriptionsByScreenSize[key];
    }

    isSubscribed(id) {
        return !!this.subscriptionsById[id];
    }

    //Метод подписки, принимает id, на какое устройство подписываем и функции которые выполняются при совпадения расширения экрана или несовпадении
    subscribe(id, screenType, whenHappens, whenNotHappens) {
        if (this.isSubscribed(id)) {
            this.deleteIdByScreenSize(id, this.subscriptionsByScreenSize);
        }

        this.subscriptionsById[id] = {
            whenHappens,
            whenNotHappens
        }

        this.subscriptionsByScreenSize[screenType].push(id);
    }

    //Метод отписки, удаляет id из объектов subscriptionsByScreenSize и subscriptionsById
    unsubscribe(id) {
        if (!this.isSubscribed(id)) {
            return;
        }

        this.deleteIdByScreenSize(id);
        delete this.subscriptionsById[id];
    }
}

export const mediaService = new MediaService([
    {
        key: 'mobile',
        matchMedia: '(max-width: 767px)'
    },
    {
        key: 'tablet',
        matchMedia: '(min-width: 768px)'
    },
    {
        key: 'desktop',
        matchMedia: '(min-width: 1440px)'
    }
]);