export class Comment {
    constructor(id, postId, beeId, name, body, user = null) {
        this.id = id;
        this.postId = postId;
        this.beeId = beeId;
        this.name = name;
        this.body = body;
        this.user = user;
    }

    setUser(user) {
        this.user = user;
    }
}