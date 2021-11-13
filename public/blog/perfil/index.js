// Url's
const validarJwt = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

const usuarios = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const uploads = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/uploads/'
    : 'https://blogi-node.herokuapp.com/api/uploads/';

// Variables
const navBar = document.querySelector('.navBar');

const spinner = document.querySelector('.spinner');
const login = document.querySelector('.login');
const irARegister = document.querySelector('.irARegister');

const imgLateral = document.getElementById('imgLateral');
const nombreLateral = document.getElementById('nombreLateral');
const correoLateral = document.getElementById('correoLateral');

const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const about = document.getElementById('about');
const profesion = document.getElementById('profesion');
const web = document.getElementById('web');
const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const linkedin = document.getElementById('linkedin');
const youtube = document.getElementById('youtube');
const passwordNueva = document.getElementById('passwordNueva');
const password = document.getElementById('password');
const guardarCuenta = document.getElementById('guardarCuenta');
const alert = document.querySelector('.alert');

// Token
const token = localStorage.getItem('token');
let idDeUsuario;

// Validat el JWT
navBar.classList.add('hidden')
spinner.classList.remove('hidden');

window.addEventListener('load', () => {
    fetch(validarJwt, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg, usuario }) => {
            if (msg !== 'Token válido') {
                darChanceDeIrse();
            }

            idDeUsuario = usuario.uid;

        })
        .catch(err => {
            darChanceDeIrse();
        })
        .finally(() => {
            navBar.classList.remove('hidden')
            spinner.classList.add('hidden');
        })
})

const darChanceDeIrse = () => {
    login.classList.remove('hidden');
    irARegister.href = public + 'auth.html';
    setTimeout(() => {
        window.location.href = public + 'auth.html';
    }, 10000);
}

const guardarUsuarioBtn = document.getElementById('guardarUsuarioBtn');

// Modo oscuro
const body = document.querySelector('body');
const windows = document.querySelectorAll('.window');
const windowDiv = [].slice.call(windows);
const lateral = document.querySelector('.lateral')

const checkbox = document.getElementById('check');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    lateral.classList.toggle('dark');
    navBar.classList.toggle('dark');

    windowDiv.forEach(w => w.classList.toggle('dark'));
})


// Funciones de botones laterales
const caracteristicasGeneralesLateral = document.getElementById('caracteristicasGeneralesLateral');
const imgDePerfilLateral = document.getElementById('imgDePerfilLateral');
const passwordLateral = document.getElementById('passwordLateral');

const caracteristicas = document.querySelector('.caracteristicas');
const imgDePerfil = document.querySelector('.imgDePerfil');
const passwordDiv = document.querySelector('.password');

caracteristicasGeneralesLateral.onclick = () => {
    caracteristicas.classList.remove('hidden');
    caracteristicasGeneralesLateral.classList.add('gris');

    imgDePerfil.classList.add('hidden');
    imgDePerfilLateral.classList.remove('gris');

    passwordDiv.classList.add('hidden');
    passwordLateral.classList.remove('gris');
}

imgDePerfilLateral.onclick = () => {
    caracteristicas.classList.add('hidden');
    caracteristicasGeneralesLateral.classList.remove('gris');

    imgDePerfil.classList.remove('hidden');
    imgDePerfilLateral.classList.add('gris');

    passwordDiv.classList.add('hidden');
    passwordLateral.classList.remove('gris');
}

passwordLateral.onclick = () => {
    caracteristicas.classList.add('hidden');
    caracteristicasGeneralesLateral.classList.remove('gris');

    imgDePerfil.classList.add('hidden');
    imgDePerfilLateral.classList.remove('gris');

    passwordDiv.classList.remove('hidden');
    passwordLateral.classList.add('gris');
}

// Trear usuario y mostrarlo
setTimeout(() => {

    fetch(usuarios + idDeUsuario, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(({ usuario }) => {
            imgLateral.src = usuario.img;

            nombreLateral.innerHTML = usuario.nombre;
            correoLateral.innerHTML = usuario.correo;

            nombre.value = usuario.nombre;
            correo.value = usuario.correo;
            about.value = usuario.descripcion;
            profesion.value = usuario.titulo;
            web.value = usuario.web;
            facebook.value = usuario.facebook;
            twitter.value = usuario.twitter;
            linkedin.value = usuario.linkedin;
            youtube.value = usuario.youtube;

        })
        .catch(console.log)

}, 1000);

// Actualizar usuario
setTimeout(() => {
    guardarUsuarioBtn.addEventListener('click', () => {

        navBar.classList.remove('hidden');
        spinner.classList.remove('hidden');

        const headersList = {
            'x-token': `${token}`,
            'Content-Type': 'application/json'
        };

        const data = {
            'nombre': `${nombre.value}`,
            'descripcion': `${about.value}`,
            'titulo': `${profesion.value}`,
            'web': `${web.value}`,
            'facebook': `${facebook.value}`,
            'twitter': `${twitter.value}`,
            'linkedin': `${linkedin.value}`,
            'youtube': `${youtube.value}`,
        };

        fetch(usuarios + idDeUsuario, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: headersList
        })
            .then(resp => resp.json())
            .then(console.log)
            .catch(console.log)
            .finally(() => {
                location.reload()
            })

    })
}, 1000);

// Vista previa de img de perfil
const imgParaSubir = document.querySelector('#imgParaSubir');
const imgPrevia = document.querySelector('#imgPrevia');
const sinImg = document.querySelector('.sinImg');
const conImg = document.querySelector('.conImg');
const guardarImg = document.querySelector('#guardarImg');

const imgFile = () => {
    var reader = new FileReader();

    reader.onload = function (e) {
        const imgFile = e.target.result;
        imgPrevia.src = imgFile
    }

    reader.readAsDataURL(imgParaSubir.files[0]);

    sinImg.classList.toggle('hidden');
    conImg.classList.toggle('hidden');
}

imgParaSubir.addEventListener('change', imgFile);

guardarImg.addEventListener('click', () => {
    var reader = new FileReader();

    reader.onload = function (e) {
        const imgFile = e.target.result;

        const data = {
            'archivo': `${imgFile}`
        };

        fetch(`${uploads}usuarios/${idDeUsuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(location.reload())
            .catch(console.log)
    }

    reader.readAsDataURL(imgParaSubir.files[0]);
})

// Actualizar cuenta
guardarCuenta.addEventListener('click', () => {

    if (passwordNueva.value === password.value) {

        spinner.classList.toggle('hidden');

        const data = {
            'correo': `${correo.value}`,
            'password': `${password.value}`
        };

        const headersList = {
            'x-token': `${token}`,
            'Content-Type': 'application/json'
        };

        fetch(usuarios + idDeUsuario, {
            method: 'PUT',
            headers: headersList,
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(location.reload())
            .catch(console.log)

    } else {
        alert.classList.toggle('hidden');
    }

})