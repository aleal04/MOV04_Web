/**
* @name main.js
* @file Add a small description for this file.
* @author <Add Your Name Here>, <addyouremail@mail.com>
* @version 1.0.0
*/

"use strict";

import { AppManager } from './managers/appManager.js';

window.addEventListener('load', init, false);

function init() {
    var installEvent = null;
    var requireHTTPS = document.getElementById('requireHTTPS');
    var installContainer = document.getElementById('installContainer');
    var installBtn = document.getElementById('installBtn');

    var appManager = new AppManager();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: './' }).then(registration => {
            // console.log('SW Registered: ', registration);
            appManager.saveDataInSW();
        }, error => {
            // console.log('Error on register service worker:', error);
        });
    }

    //Check HTTPS
    if (!appManager.IS_DEVELOPMENT) {
        if (window.location.protocol === 'http:') {
            requireHTTPS.classList.remove('hidden');
        } else {
            //The BeforeInstallPromptEvent is the interface of the beforeinstallprompt event fired at the Window object before a user is prompted to "install" a website to a home screen on mobile.
            window.addEventListener('beforeinstallprompt', (event) => {
                console.log('SHOW INSTALL');
                installContainer.classList.remove('hidden');
                event.preventDefault();
                installEvent = event;
            });

            installBtn.onclick = (e) => {

                if (!installEvent) return;

                installEvent.prompt();

                installEvent.userChoice.then(result => {
                    installEvent = null;
                    console.log('HIDE INSTALL');
                    installContainer.classList.add('hidden');
                });
            }
        }
    }
}