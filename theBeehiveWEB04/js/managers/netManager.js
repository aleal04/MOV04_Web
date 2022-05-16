import { Manager } from "./manager.js";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from '../models/comment.js';

export class NetManager extends Manager {
    constructor(appManager) {
        super(appManager);
        this.baseURL = 'https://thebeehiveweb04-default-rtdb.firebaseio.com/data/';
    }

    getData(type, callback) {
        fetch(`${this.baseURL}${type}.json`).then(response => {
            response.json().then(data => {
                callback(data);
            }, error => {
                console.log(`Error parsing ${type} json:`, error);
            })
        }, error => {
            console.log(`Error requesting ${type} json:`, error);
        });
    }

    getInitialData() {
        this.getData('users', this.processUsers.bind(this));
    }

    processUsers(data) {
        data.forEach(userData => {
            var user = new User(userData.id, userData.name, userData.username, userData.avatar, userData.email, userData.isOwner, userData.website, userData.phone);
            this.appManager.dataManager.addUser(user);
        });

        this.getData('posts', this.processPosts.bind(this));
    }

    processPosts(data) {
        data.forEach(postData => {
            var post = new Post(postData.id, postData.body, postData.title, postData.userId);
            this.appManager.dataManager.addPost(post);
        });
        this.getData('comments', this.processComments.bind(this));
    }

    processComments(data) {
        data.forEach(commentData => {
            var comment = new Comment(commentData.id, commentData.postId, commentData.beeId, commentData.name, commentData.body);
            this.appManager.dataManager.addComment(comment);
        })
        this.appManager.downloadCompleted();
    }
}
