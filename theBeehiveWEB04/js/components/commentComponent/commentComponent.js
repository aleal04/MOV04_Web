import { Component } from "../component.js";
import { p, div, image } from '../../libs/html.js';

export class CommentComponent extends Component {
    constructor(appManager, parent, comment) {
        super(appManager, parent);
        this.comment = comment;

        this.container.className = 'commentComponent';
        this.name = p({ className: 'commentComponent_name', innerHTML: this.comment.name }, this.container);
        this.body = p({ className: 'commentComponent_body', innerHTML: this.comment.body }, this.container);

        this.userContainer = div({ className: 'commentComponent_user_container' }, this.container);

        this.imageContainer = div({ className: 'commentComponent_image_container' }, this.userContainer);
        this.avatar = image({ className: 'commentComponent_image', src: this.comment.user.avatar }, this.imageContainer);

        this.userInfoContainer = div({ className: 'commentComponent_userInfo_container' }, this.userContainer);

        this.user = p({ className: 'commentComponent_user', innerHTML: this.comment.user.name }, this.userInfoContainer);
        this.email = p({ className: 'commentComponent_email', innerHTML: this.comment.user.email }, this.userInfoContainer);
    }
}