import { Component } from "../component.js";
import { UserComponent } from "../userComponent/userComponent.js";

export class UserListComponent extends Component {
    constructor(appManager, parent) {
        super(appManager, parent);
        this.container.className = 'userListComponent';
        this.showUsers();
    }

    showUsers() {
        var users = this.appManager.dataManager.users;
        for (const key in users) {
            const user = users[key];
            var userComponet = new UserComponent(this.appManager, this.container, user);
        }
    }
}