const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const spinner = document.querySelector('.spinner');
const cerrarSesion = document.querySelector('#cerrarSesion');
const login = document.querySelector('.login');
const register = document.querySelector('.register');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://blogi-node.herokuapp.com/api/auth/';

const url2 = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public'
    : 'https://blogi-node.herokuapp.com';

login.addEventListener('click', ev => {

    ev.preventDefault();

    const params = new URLSearchParams(location.search);
    const premiumUrl = params.get('collection_status');

    // Si se ha cambiado a Premium
    if (premiumUrl === 'approved') {
        const actualizarAPremium = async () => {
            const formData = {
                correo: loginEmail.value,
                password: loginPassword.value
            };

            // Fetch para obtener datos necesarios del usuario para poder actualizar
            await fetch(url + 'login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(resp => resp.json())
                .then(async ({ usuario, token }) => {

                    // Fetch para hacerlo premium y redirigirlo a su panel
                    fetch(url2 + usuario.uid, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-token': token
                        },
                        body: JSON.stringify({ premium: true })
                    })
                        .then(resp => resp.json())
                        .then(() => {
                            window.location = public + '/blog/articulos/';
                        })
                        .catch(console.log)
                        .finally(() => {
                            spinner.classList.toggle('hidden');
                        })
                })
                .catch(console.log)
                .finally(() => {
                    spinner.classList.toggle('hidden');
                })
        }

        actualizarAPremium();

    } else {
        const formData = {
            correo: loginEmail.value,
            password: loginPassword.value
        };

        fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => resp.json())
            .then(({ token }) => {
                if (token !== undefined) {
                    localStorage.setItem('token', token);
                    window.location = public + '/blog/articulos/';
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

})

register.addEventListener('click', ev => {

    const params = new URLSearchParams(location.search);
    const premiumUrl = params.get('collection_status');

    const premium = localStorage.getItem('premium');
    let formData;

    ev.preventDefault();

    if (premium === 'false') {
        formData = {
            nombre: registerName.value,
            correo: registerEmail.value,
            password: registerPassword.value,
            premium: false
        };
    } else if (premiumUrl === 'approved') {
        formData = {
            nombre: registerName.value,
            correo: registerEmail.value,
            password: registerPassword.value,
            premium: true
        };
    }

    fetch(url2, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ token }) => {

            if (token === undefined) {
                return;
            } else {
                localStorage.setItem('token', token);
                localStorage.setItem('premium', true);

                window.location = public + '/blog/articulos/';
            }

        })
        .catch(err => {
            console.log(err)
        })

})

function onSignIn(googleUser) {

    const premium = Boolean(localStorage.getItem('premium'));

    var id_token = googleUser.getAuthResponse().id_token;
    const data = { id_token, premium };

    fetch(url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {

            console.log(msg)

            if (token !== undefined) {
                localStorage.setItem('token', token);
                window.location = public + '/blog/articulos/';
            }

        })
        .catch(console.log)

}

cerrarSesion.addEventListener('click', function () {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        auth2.disconnect();
    });
})