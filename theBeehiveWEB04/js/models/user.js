export class User {
    constructor(id, name, username, avatar, email, isOwner, website, phone) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.email = email;
        this.isOwner = isOwner;
        this.website = website;
        this.phone = phone;
        this.posts = [];
    }

    addPost(post) {
        this.posts.unshift(post);
    }
}