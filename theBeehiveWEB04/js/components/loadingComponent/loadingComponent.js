import { Component } from "../component.js";

export class LoadingComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent);

        this.container.className = 'loadingComponent';

        this.title = document.createElement('p');
        this.container.appendChild(this.title);
        this.title.className = 'loadingComponent_title';
        this.title.innerHTML = 'Loading...';
    }
}