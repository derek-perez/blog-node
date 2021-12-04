self.addEventListener('install', e => {
    console.log('Se instaló el SW');
})

self.addEventListener('activate', e => {
    console.log('Se activó el SW');
})

let deste;

self.addEventListener('push', e => {

    const data = JSON.parse(e.data.text())

    console.log(data)

    const title = data.titulo

    const options = {
        body: data.usuario,
        icon: data.icon,
        badge: 'https://blogi-node.herokuapp.com/img/favicon.ico',
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
    window.location = e.notification.data.url
});