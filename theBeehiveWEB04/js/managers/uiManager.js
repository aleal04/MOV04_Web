import { LoadingComponent } from "../components/loadingComponent/loadingComponent.js";
import { MainComponent } from "../components/mainComponent/mainComponent.js";
import { Manager } from "./manager.js";
import { SHOWING_USERS, SHOWING_POSTS, SHOWING_NEW_POST, SHOWING_NEW_COMMENT } from "./appManager.js";

export class UIManager extends Manager {
    constructor(appManager) {
        super(appManager);
        this.loadingComponent = new LoadingComponent(this.appManager, document.body);
        this.mainComponent = null;
        this.state = SHOWING_USERS;
    }

    showUI() {
        this.mainComponent = new MainComponent(this.appManager, document.body);
        this.mainComponent.hideBackBtn();
    }

    onBackBtn() {
        switch (this.state) {
            case SHOWING_USERS:
                break;
            case SHOWING_POSTS:
                this.appManager.selectedUser = null;
                this.state = SHOWING_USERS;
                this.mainComponent.hideBackBtn();
                this.mainComponent.hidePostListComponent();
                break;
            case SHOWING_NEW_POST:
                this.state = SHOWING_POSTS;
                break;
            case SHOWING_NEW_COMMENT:
                this.state = SHOWING_POSTS;
                this.mainComponent.hideFormComponent();
                break;
            default:
                break;
        }
    }

    showPostListComponent() {
        this.mainComponent.showBackBtn();
        this.state = SHOWING_POSTS;
        this.mainComponent.showPostListComponent();
    }

    showFormComponent() {
        this.state = SHOWING_NEW_COMMENT;
        this.mainComponent.showFormComponent();
    }

    hideFormComponent() {
        this.onBackBtn();
    }
}