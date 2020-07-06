import AbstractComponent from './abstractComponent';
const nav = document.querySelector('.navigation');

export default class Navigation extends AbstractComponent {
    constructor() {
        super();
        this._element = nav;
        this.navItems = nav.querySelectorAll('.navigation__item');
        this.setNavClickHandler = this.setNavClickHandler.bind(this);
    }

    setNavClickHandler(handler) {
        Array.from(this.navItems).forEach((navItem) => {
            navItem.addEventListener('click', handler);
        });
    }
}
