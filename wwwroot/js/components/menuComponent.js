import AbstractComponent from './abstractComponent';
import mediaService from '../modules/mediaService';

const header = document.querySelector('.master-header');


export default class Menu extends AbstractComponent {
    constructor() {
        super();

        this._element = header;
        this.openMenuBtn = this._element.querySelector('.master-header__menu-open');
        this.closeMenuBtn = this._element.querySelector('.master-header__menu-close');
        this.search = this._element.querySelector('.search');
        this.showSearchBtn = this._element.querySelector('.master-header__show-search');
        this.searchBackBtn = this._element.querySelector('.search__icon-btn-back');
        this.searchInput = this.search.querySelector('.search__input');
        this.searchResult = this.search.querySelector('.search__result');
        this.menuBlock = this._element.querySelector('.menu');
        this.menuUser = this.menuBlock.querySelector('.menu__user');

        // bind handlers
        this.openMenuHandler = this.openMenuHandler.bind(this);
        this.closeMenuHandler = this.closeMenuHandler.bind(this);
        this.showMobileSearchHandler = this.showMobileSearchHandler.bind(this);
        this.showSearchResultHandler = this.showSearchResultHandler.bind(this);
        this.hideMobileSearchHandler = this.hideMobileSearchHandler.bind(this);
        this.showSearchResultHandler = this.showSearchResultHandler.bind(this);
        this.hideSearchResultHandler = this.hideSearchResultHandler.bind(this);
        this.showMenuDesktopHandler = this.showMenuDesktopHandler.bind(this);

        this.whenMobileSearch = this.whenMobileSearch.bind(this);
        this.whenNotMobileSearch = this.whenNotMobileSearch.bind(this);
        this.whenTabletSearch = this.whenTabletSearch.bind(this);
        this.whenNotTabletSearch = this.whenNotTabletSearch.bind(this);
        this.whenMobileMenu = this.whenMobileMenu.bind(this);
        this.whenNotMobileMenu = this.whenNotMobileMenu.bind(this);
        this.whenDesktopMenu = this.whenDesktopMenu.bind(this);
        this.whenNotDesktopMenu = this.whenNotDesktopMenu.bind(this);
        this.setMyProfileOpenHandler = this.setMyProfileOpenHandler.bind(this);
    }

    getElement() {
        return this._element;
    }

    // handlers

    openMenuHandler() {
        this.getElement().classList.remove('master-header--close-menu');
    }

    closeMenuHandler() {
        this.getElement().classList.add('master-header--close-menu');
    }

    showMobileSearchHandler() {
        this.search.classList.add('search--show');
        this.searchInput.focus();
        this.searchResult.classList.add('search__result--open');
    }

    hideMobileSearchHandler() {
        this.search.classList.remove('search--show');
        this.searchInput.blur();
        this.searchResult.classList.remove('search__result--open');
    }

    showSearchResultHandler() {
        this.searchResult.classList.add('search__result--open');
    }

    hideSearchResultHandler() {
        this.searchResult.classList.remove('search__result--open');
    }

    showMenuDesktopHandler() {
        this.menuBlock.classList.toggle('menu--openlist');
    }

    showMyProfile(handler) {
        this.menuBlock.querySelector('.menu__nav-item-profile').addEventListener('click', handler);
    }


    // define change screen handlers

    whenMobileSearch() {
        this.showSearchBtn.addEventListener('click', this.showMobileSearchHandler);
        this.searchBackBtn.addEventListener('click', this.hideMobileSearchHandler);
    }

    whenNotMobileSearch() {
        this.showSearchBtn.removeEventListener('click', this.showMobileSearchHandler);
        this.searchBackBtn.removeEventListener('click', this.hideMobileSearchHandler);
    }

    whenTabletSearch() {
        this.searchInput.addEventListener('focus', this.showSearchResultHandler);
        this.searchInput.addEventListener('blur', this.hideSearchResultHandler);
    }

    whenNotTabletSearch() {
        this.searchInput.removeEventListener('focus', this.showSearchResultHandler);
        this.searchInput.removeEventListener('blur', this.hideSearchResultHandler);
    }

    whenMobileMenu() {
        this.openMenuBtn.addEventListener('click', this.openMenuHandler);
        this.closeMenuBtn.addEventListener('click', this.closeMenuHandler);
    }

    whenNotMobileMenu() {
        this.openMenuBtn.removeEventListener('click', this.openMenuHandler);
        this.closeMenuBtn.removeEventListener('click', this.closeMenuHandler);
    }

    whenDesktopMenu() {
        this.menuUser.addEventListener('click', this.showMenuDesktopHandler);
    }

    whenNotDesktopMenu() {
        this.menuUser.removeEventListener('click', this.showMenuDesktopHandler);
    }

    // setting handlers first

    setScreenHandlers() {
        if (mediaService.mqlmobile.matches) {
            this.whenMobileSearch();
        }

        if (mediaService.mqltablet.matches) {
            this.whenTabletSearch();
        }

        if (mediaService.mqlmobileTablet.matches) {
            this.whenMobileMenu();
        }

        if (mediaService.mqldesktop.matches) {
            this.whenDesktopMenu();
        }
    }

    subscribeMediaEvents() {
        mediaService.subscribe('mobileSearch', 'mobileTablet', this.whenMobileSearch, this.whenNotMobileSearch);
        mediaService.subscribe('mobileMenu', 'mobileTablet', this.whenMobileMenu, this.whenNotMobileMenu);
        mediaService.subscribe('tabletSearch', 'tablet', this.whenTabletSearch, this.whenNotTabletSearch);
        mediaService.subscribe('desktopMenu', 'desktop', this.whenDesktopMenu, this.whenNotDesktopMenu);
    }

    setMyProfileOpenHandler(handler) {
        this.getElement().querySelector('.menu__nav-item-profile').addEventListener('click', handler);
    }
}
