var port = null;
var userData = null;
const version = '1.0';

var staticCacheName = "beehive-version" + version;
const filesToCache  = [    
    '/js/components/mainComponent/mainComponent.css',
    '/js/components/navbarComponent/navbarComponent.css',
    '/js/components/navbarComponent/navbarComponent.css',
    '/js/components/userListComponent/userListComponent.css',

    '/js/components/postListComponent/postListComponent.css',
    '/js/components/postComponent/postComponent.css"',

    '/js/components/commentComponent/commentComponent.css',
    '/js/components/userComponent/userComponent.css"',

    '/js/components/formComponent/formComponent.css',
    '/js/components/formComponent/inputComponent/inputComponent.css',

    '/src/images/addIcon.svg',
    '/src/images/backIcon.svg',
    '/src/images/icon192.png',
    '/src/images/icon196.png',
    '/src/images/icon512.png',

    '/404.html'
    
];

self.addEventListener('activate', function(event) {
    //event.waitUntil(clients.claim());
    event.waitUntil(                  
        caches
        .keys()
        .then(keys => keys.filter(key => !key.endsWith(version)))
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
    );
});

self.addEventListener('install', event => {
    //event.waitUntil(self.skipWaiting());
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    )
});

self.addEventListener('message', event => {
    // console.log(event);
    var data = event.data;
    self.port = event.ports[0];
    switch (data.type) {
        case 'SET_USER_DATA':
            if (self.userData === null) {
                console.log('UserData Saved:', data);
                self.userData = data.userData;
            }
            break;
        case 'GET_USER_DATA':
            if (self.userData !== null) {
                self.port.postMessage({ type: 'USER_DATA_SENT', userData: self.userData });
            } else {
                self.port.postMessage({ type: 'USER_DATA_NOT_SET', userData: null });
            }
            break;
        default:
            break;
    }
});
