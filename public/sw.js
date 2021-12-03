self.addEventListener('install', e => {
    console.log('Se instaló el SW');
})

self.addEventListener('activate', e => {
    console.log('Se activó el SW');
})

self.addEventListener('push', e => {

    const data = JSON.parse(e.data.text())

    const title = data.titulo

    const options = {};

    e.waitUntil(self.registration.showNotification(title, options));
})

// Cuando se cierra la notificación
self.addEventListener('notificationclose', e => {
    console.log('Se cerró')
});

// Cuando el usuario toca la notificación
self.addEventListener('notificationclick', e => {
    console.log('Fue tocado')
});