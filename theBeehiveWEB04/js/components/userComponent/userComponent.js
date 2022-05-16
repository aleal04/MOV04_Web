import { Component } from "../component.js";
import { div, image, p } from '../../libs/html.js';

export class UserComponent extends Component {
    constructor(appManager, parent, user) {
        super(appManager, parent);
        this.container.className = 'userComponent'
        this.user = user;

        if (user.isOwner) {
            this.container.classList.add('userComponent_isOwner');
        }

        var col1 = div({ className: 'userComponent_col1' }, this.container);
        var col2 = div({ className: 'userComponent_col2' }, this.container);
        var avatarContainer = div({ className: 'userComponent_avatar_container' }, col1)
        var avatar = image({ className: 'userComponent_avatar', src: this.user.avatar }, avatarContainer);

        var name = p({ className: 'userComponent_name', innerHTML: this.user.name }, col2);
        var username = p({ className: 'userComponent_text', innerHTML: `<b>Username:</b> ${this.user.username}` }, col2);
        var email = p({ className: 'userComponent_text', innerHTML: `<b>Email:</b> ${this.user.email}` }, col2);
        var phone = p({ className: 'userComponent_text', innerHTML: `<b>Phone:</b> ${this.user.phone}` }, col2);
        var website = p({ className: 'userComponent_text', innerHTML: `<b>Website:</b> ${this.user.website}` }, col2);
        this.container.onclick = this.onClick.bind(this);
    }

    onClick() {
        this.appManager.selectedUser = this.user;
        this.appManager.uiManager.showPostListComponent();
        this.appManager.getDataInSW();
    }
}