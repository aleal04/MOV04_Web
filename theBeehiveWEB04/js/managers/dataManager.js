import { Manager } from "./manager.js";

export class DataManager extends Manager {
    constructor(appManager) {
        super(appManager);
        this.users = {};
    }

    addUser(user) {
        if (user.isOwner) {
            this.appManager.owner = user;
        }

        this.users[`${user.id}`] = user;
    }

    addPost(post) {
        this.users[post.userId].addPost(post);
    }

    addComment(comment) {
        comment.setUser(this.users[comment.beeId]);
        for (const userId in this.users) {
            this.users[userId].posts.forEach(post => {
                if (post.id === comment.postId) {
                    post.addComment(comment);
                }
            });
        }
    }
}