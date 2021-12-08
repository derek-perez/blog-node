self.addEventListener('install', e => {
    console.log('Se instaló el SW');

    self.skipWaiting();
})

self.addEventListener('activate', e => {
    console.log('Se activó el SW');
})

self.addEventListener('fetch', () => {
    const d = 0;
})

let deste;

self.addEventListener('push', e => {

    const data = JSON.parse(e.data.text())

    const title = data.titulo

    const options = {
        body: data.body,
        icon: 'https://blogi-node.herokuapp.com/img/logo.png',
        badge: 'https://blogi-node.herokuapp.com/img/logo.png',
        vitrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
        openUrl: data.dir,
        data: {
            url: data.dir
        },
    };

    e.waitUntil(self.registration.showNotification(title, options));
})

// Cuando se cierra la notificación
self.addEventListener('notificationclose', e => {
    console.log('Se cerró')
});

// Cuando el usuario toca la notificación
self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;

    clients.openWindow(notificacion.data.url);
});