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

    spinner.classList.toggle('hidden');

    ev.preventDefault();

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
        .then(({ msg, token }) => {
            if (msg) {
                alerta.forEach(a => {
                    a.classList.toggle('hidden');
                    msgError.forEach(m => {
                        return m.innerText = msg;
                    })
                })

            }

            if (token !== undefined) {
                localStorage.setItem('token', token);
                window.location = public + '/blog/articulos/';
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            spinner.classList.toggle('hidden')
        })

})

register.addEventListener('submit', ev => {

    spinner.classList.toggle('hidden');

    ev.preventDefault();

    const formData = {
        nombre: registerName.value,
        correo: registerEmail.value,
        password: registerPassword.value
    };

    fetch(url2, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
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
                window.location = public + '/blog/articulos/';
            }

        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            spinner.forEach(s => {
                s.classList.toggle('hidden');
            })
        })

})



function onSignIn(googleUser) {

    spinner.classList.toggle('hidden');

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

            if (token !== undefined) {
                localStorage.setItem('token', token);
                window.location = public + '/blog/articulos/';
            }

        })
        .catch(console.log)
        .finally(() => {
            spinner.classList.toggle('hidden');
        });

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

cerrarSesion.addEventListener('click', () => {
    signOut()
})