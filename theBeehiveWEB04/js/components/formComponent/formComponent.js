import { div, p } from "../../libs/html.js";
import { Comment } from "../../models/comment.js";
import { Component } from "../component.js";
import { InputComponent } from "./inputComponent/inputComponent.js";

export class FormComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent)
        this.container.className = 'formComponent';

        this.fade = div({ className: 'formComponent_fade' }, this.container);
        this.displayContainer = div({ className: 'formComponent_displayContainer' }, this.container);
        this.displayContainer.style.transform = `translateX(${window.innerWidth}px)`;
        this.container.classList.add('hidden');

        this.title = p({ innerHTML: 'Adding a New Comment', className: 'formComponent_title' }, this.displayContainer);

        var inputContainer = div({ className: 'formComponent_inputContainer' }, this.displayContainer);
        this.titleInput = new InputComponent(this.appManager, inputContainer, 'Title', 'Hello there!', 'Add a title to your comment.');

        this.bodyInput = new InputComponent(this.appManager, inputContainer, 'Body', 'I love your post!', 'Add a body to your comment.');

        this.addBtn = div({ className: 'formComponent_addBtn', innerHTML: 'Add', onclick: this.onAddBtn.bind(this) }, inputContainer);

    }

    onAddBtn() {
        if (this.titleInput.validate() && this.bodyInput.validate()) {
            var title = this.titleInput.value();
            var body = this.bodyInput.value();
            var comment = new Comment(-1, this.appManager.selectedPost.id, this.appManager.owner.id, title, body, this.appManager.owner);
            this.appManager.selectedPost.addComment(comment);
            this.appManager.uiManager.hideFormComponent();
        }
    }

    moveIn() {
        this.container.classList.remove('hidden');
        gsap.to(this.displayContainer, { x: 0, duration: 1, ease: 'power4.out' });
        gsap.to(this.fade, { opacity: 0.75, duration: 0.15, ease: 'sine.out' });
    }

    moveOut() {
        gsap.to(this.displayContainer, { x: window.innerWidth, duration: 0.5, ease: 'power4.in' });
        gsap.to(this.fade, { opacity: 0, duration: 0.75, ease: 'sine.in', onComplete: this.moveOutComplete.bind(this) });
    }

    moveOutComplete() {
        this.titleInput.clean();
        this.bodyInput.clean();
        this.container.classList.add('hidden');
    }
}