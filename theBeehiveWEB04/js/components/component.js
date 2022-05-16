export class Component {
    constructor(appManager, parent) {
        this.appManager = appManager;
        this.parent = parent;
        this.container = document.createElement('div');
        this.parent.appendChild(this.container);
    }

    hide() {
        this.container.classList.add('hidden');
    }

    show() {
        this.container.classList.remove('hidden');
    }

    moveIn() {

    }

    moveOut() {

    }
}