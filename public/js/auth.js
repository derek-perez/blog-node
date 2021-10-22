const login = document.querySelector('.login');
const register = document.querySelector('.register');

const msgErrors = document.querySelectorAll('.msgError');
const msgError = [].slice.call(msgErrors);

const alertas = document.querySelectorAll('.alert-dismissible');
const alerta = [].slice.call(alertas);

const forms = document.querySelectorAll('.form');
const form = [].slice.call(forms);

const toggles = document.querySelectorAll('.toggle');
const toggle = [].slice.call(toggles);

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://blogi-node.herokuapp.com/api/auth/';

const url2 = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public'
    : 'https://blogi-node.herokuapp.com';

// Toggle
toggle.forEach(t => {
    t.addEventListener('click', () => {
        form.forEach(f => {
            f.classList.toggle('hidden')
        })
    })
})

login.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for (let el of login.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                alerta.classList.toggle('hidden');
                return msgError.innerText = msg;
            }

            localStorage.setItem('token', token);
            window.location = public + '/blog/index.html';
        })
        .catch(err => {
            console.log(err)
        })

})

register.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for (let el of register.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    fetch(url2, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                alerta.forEach(a => {
                    a.classList.toggle('hidden');
                    msgError.forEach(m => {
                        return m.innerText = msg;
                    })
                })
            }

            if (token === undefined) {
                msg === 'No se ha podido agregar token';
                return msgError.innerText = msg;
            } else {
                localStorage.setItem('token', token);
                window.location = public + '/blog/index.html';
            }

        })
        .catch(err => {
            console.log(err)
        })

})



function onSignIn(googleUser) {

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    const data = { id_token };

    fetch(url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {

            console.log(msg)

            localStorage.setItem('token', token);
            window.location = public + '/blog/index.html';

        })
        .catch(console.log);

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}