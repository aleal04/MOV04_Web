import { div } from "../../libs/html.js";
import { Component } from "../component.js";
import { PostComponent } from "../postComponent/postComponent.js";

export class PostListComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent)
        this.container.className = 'postListComponent';

        this.fade = div({ className: 'postListComponent_fade' }, this.container);
        this.displayContainer = div({ className: 'postListComponent_displayContainer' }, this.container);
        this.displayContainer.style.transform = `translateX(${window.innerWidth}px)`;
        this.container.classList.add('hidden');
    }

    showPosts() {
        this.container.classList.remove('hidden');
        this.refresh();

        this.moveIn();
    }

    refresh() {
        this.displayContainer.innerHTML = '';
        var user = this.appManager.selectedUser;

        user.posts.forEach(post => {
            var userComponet = new PostComponent(this.appManager, this.displayContainer, post);
        });
    }

    moveIn() {
        gsap.to(this.displayContainer, { x: 0, duration: 1, ease: 'power4.out' });
        gsap.to(this.fade, { opacity: 0.75, duration: 0.15, ease: 'sine.out' });
    }

    moveOut() {
        gsap.to(this.displayContainer, { x: window.innerWidth, duration: 0.5, ease: 'power4.in' });
        gsap.to(this.fade, { opacity: 0, duration: 0.75, ease: 'sine.in', onComplete: this.moveOutComplete.bind(this) });
    }

    moveOutComplete() {
        this.container.classList.add('hidden');
    }
}