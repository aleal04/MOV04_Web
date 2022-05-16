import { Component } from "../component.js";
import { FormComponent } from "../formComponent/formComponent.js";
import { NavbarComponent } from "../navbarComponent/navbarComponent.js";
import { PostListComponent } from "../postListComponent/postListComponent.js";
import { UserListComponent } from "../userListComponent/userListComponent.js";

export class MainComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.container.className = 'mainComponent';
        this.navbarComponent = new NavbarComponent(this.appManager, this.container);
        this.userListComponent = new UserListComponent(this.appManager, this.container);
        this.postListComponent = new PostListComponent(this.appManager, this.container);
        this.formComponent = new FormComponent(this.appManager, this.container);
    }

    showPostListComponent() {
        this.postListComponent.showPosts();
    }

    hidePostListComponent() {
        this.postListComponent.moveOut()
    }

    hideBackBtn() {
        this.navbarComponent.hideBackBtn();
    }

    showBackBtn() {
        this.navbarComponent.showBackBtn();
    }

    showFormComponent() {
        this.formComponent.moveIn();
    }

    hideFormComponent() {
        this.postListComponent.refresh();
        this.formComponent.moveOut();
    }
}