
import { DataManager } from "./dataManager.js";
import { Manager } from "./manager.js";
import { NetManager } from "./netManager.js";
import { UIManager } from "./uiManager.js";
export const SHOWING_USERS = 1;
export const SHOWING_POSTS = 2;
export const SHOWING_NEW_POST = 3;
export const SHOWING_NEW_COMMENT = 4;

export class AppManager extends Manager {
    constructor(appManager) {
        super(null);
        this.netManager = new NetManager(this);
        this.dataManager = new DataManager(this);
        this.uiManager = new UIManager(this);
        this.netManager.getInitialData();
        this.owner = null;
        this.selectedUser = null;
        this.selectedPost = null;
        this.IS_DEVELOPMENT = false;
        this.messageChannel = null;
    }

    downloadCompleted() {
        this.uiManager.showUI();
    }

    saveDataInSW() {
        this.messageChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage({ type: 'SET_USER_DATA', userData: { name: 'Esteban', lastname: 'Padilla', username: 'epadilla', token: 'kkr007' } }, [this.messageChannel.port2]);
    }

    getDataInSW() {
        this.messageChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage({ type: 'GET_USER_DATA' }, [this.messageChannel.port2]);

        this.messageChannel.port1.onmessage = event => {
            var data = event.data;
            switch (data.type) {
                case 'USER_DATA_SENT':
                    console.log(data.userData);
                    break;
                default:
                    break;
            }
        }
    }
}