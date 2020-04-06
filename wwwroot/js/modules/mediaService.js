class MediaService {

    constructor() {
        this.mqlMobile = window.matchMedia('(max-width: 767px)');
        this.mqlTablet = window.matchMedia('(min-width: 768px)');
        this.mqlDesktop = window.matchMedia('(min-width: 1440px)');
        this.mqlMobile.addListener(this.mobileListener.bind(this));
        this.mqlTablet.addListener(this.tabletListener.bind(this));
        this.mqlDesktop.addListener(this.desktopListener.bind(this));
        this.subscriptionsByScreenSize = {
            mobile: [],
            tablet: [],
            desktop: []
        };
        this.subscriptionsById = {};
    }

    mobileListener(evt) {
        if (evt.matches) {
            this.subscriptionsByScreenSize.mobile.forEach(id => {
                this.subscriptionsById[id].whenHappens()
            })
        } else {
            this.subscriptionsByScreenSize.mobile.forEach(id => {
                this.subscriptionsById[id].whenNotHappens()
            })
        }
    }

    tabletListener(evt) {
        if (evt.matches) {
            this.subscriptionsByScreenSize.tablet.forEach(id => {
                this.subscriptionsById[id].whenHappens()
            })
        } else {
            this.subscriptionsByScreenSize.tablet.forEach(id => {
                this.subscriptionsById[id].whenNotHappens()
            })
        }
    }

    desktopListener(evt) {
        if (evt.matches) {
            this.subscriptionsByScreenSize.desktop.forEach(id => {
                this.subscriptionsById[id].whenHappens()
            })
        } else {
            this.subscriptionsByScreenSize.desktop.forEach(id => {
                this.subscriptionsById[id].whenNotHappens()
            })
        }
    }

    subscribe(id, screenType, whenHappens, whenNotHappens) {
        if (!this.subscriptionsById[id]) {
            this.subscriptionsByScreenSize[screenType].push(id)
        }
        this.subscriptionsById[id] = {
            whenHappens,
            whenNotHappens
        }
    }

    unsubscribe(id) {
        if (!this.subscriptionsById[id]) {
            return;
        }

        for (let screen in this.subscriptionsByScreenSize) {
            let idPlace = this.subscriptionsByScreenSize[screen].indexOf(id);
            if (idPlace >= 0) {
                this.subscriptionsByScreenSize[screen].splice(idPlace, 1);
            }
        }

        delete this.subscriptionsById[id];
    }
}

export const mediaService = new MediaService();