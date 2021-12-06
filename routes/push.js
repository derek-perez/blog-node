const express = require('express');
const app = express.Router();
const push = require('../helpers/push');



// Almacenar la suscripción
app.post('/subscribe', (req, res) => {

    const suscripcion = req.body;

    push.addSubscription(suscripcion);

    res.json('subscribe');

});

// Almacenar la suscripción
app.get('/key', (req, res) => {
    const key = push.getKey();
    res.send(key);
});

// Mandar push 
app.post('/', (req, res) => {

    const post = {
        titulo: req.body.titulo,
        body: req.body.body,
        dir: req.body.dir,
    };


    push.sendPush(post);

    res.json(post);

})


module.exports = app;