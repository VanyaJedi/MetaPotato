
import mediaService from '../modules/mediaService.js';

import Menu from '../components/menuComponent.js';

const header = document.querySelector('.master-header');
const search = header.querySelector('.search');

//Mobile search



//Mobile & Tablet menu
const openMenuBtn = header.querySelector('.master-header__menu-open');
const closeMenuBtn = header.querySelector('.master-header__menu-close');

const openMenuHandler =  () => {
    header.classList.remove('master-header--close-menu');
}

const closeMenuHandler =  () => {
    header.classList.add('master-header--close-menu');
}

export default class MenuController {
    constructor() {
        this._menuComponent = new Menu();
    }

    setMenuHandlers() {
        this._menuComponent.setScreenHandlers();
    }

    subsribeMenuMediaEvents() {
        this._menuComponent.subscribeMediaEvents();
    }



}