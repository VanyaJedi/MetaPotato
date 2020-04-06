class MediaService {

    constructor() {
        this.mqlMobile = window.matchMedia('(max-width: 767.99px)'),
            this.mqlTablet = window.matchMedia('(min-width: 768px)'),
            this.mqlDesktop = window.matchMedia('(min-width: 1440px)'),
            this.mqlMobile.addListener(this.mobileListener.bind(this)),
            this.mqlTablet.addListener(this.tabletListener.bind(this)),
            this.mqlDesktop.addListener(this.desktopListener.bind(this)),
            this.subscriptionsByScreenSize = {
                mobile: [],
                tablet: [],
                desktop: []
            },
            this.subscriptionsById = {}
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
        this.subscriptionsByScreenSize[screenType].push(id)
        this.subscriptionsById[id] = {
            whenHappens,
            whenNotHappens
        }
    }
}

export const mediaService = new MediaService();