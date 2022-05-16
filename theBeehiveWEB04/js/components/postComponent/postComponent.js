import { Component } from "../component.js";
import { p, div } from '../../libs/html.js';
import { CommentComponent } from "../commentComponent/commentComponent.js";

export class PostComponent extends Component {
    constructor(appManager, parent, post) {
        super(appManager, parent);
        this.post = post;

        this.container.className = 'postComponent';
        this.title = p({ className: 'postComponent_title', innerHTML: this.post.title }, this.container);
        this.body = p({ className: 'postComponent_body', innerHTML: this.post.body }, this.container);
        this.addBtn = div({ className: 'postComponent_addBtn', innerHTML: 'Add New Comment', onclick: this.onAddBtn.bind(this) }, this.container);
        this.commentsContainer = div({ className: 'postComponent_comments_container' }, this.container);
        this.addComments();
    }

    addComments() {
        this.post.comments.forEach(comment => {
            var commentComponent = new CommentComponent(this.appManager, this.commentsContainer, comment);
        });
    }

    onAddBtn() {
        this.appManager.selectedPost = this.post;
        this.appManager.uiManager.showFormComponent();
    }
}