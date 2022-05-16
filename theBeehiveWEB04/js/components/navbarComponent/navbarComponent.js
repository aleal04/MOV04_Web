import { Component } from "../component.js";
import { div, image } from '../../libs/html.js';

export class NavbarComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.container.className = 'navbarComponent';
        this.backBtn = div({ onclick: this.onBackBtn.bind(this), className: 'navbarComponent_backBtn' }, this.container);
        this.backBtnIcon = image({ className: 'navbarComponent_backBtnIcon', src: 'src/images/backIcon.svg' }, this.backBtn);
    }

    onBackBtn() {
        this.appManager.uiManager.onBackBtn();
    }

    hideBackBtn() {
        this.backBtn.classList.add('hidden');
    }

    showBackBtn() {
        this.backBtn.classList.remove('hidden');
    }
}