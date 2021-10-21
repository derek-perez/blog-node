// Url
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

// Referencias HTML
const userImg = document.querySelector('.userImg');
const userAccount = document.querySelector('.userAccount');
const cerrarSesion = document.querySelector('.cerrarSesion');

// Verificar si está logueado
const token = localStorage.getItem('token');

if (token === null) {
    window.location = '../auth.html';
}

window.addEventListener('load', () => {
    fetch(url, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg }) => {
            if (msg !== 'Token válido') {
                window.location = public + 'auth.html';
            }
        })
        .catch(err => {
            console.log(err)
        })
})

// Abrir cuadro de usuario
userImg.addEventListener('click', () => {
    userAccount.classList.toggle('hidden');
});

// Cerrar sesión
cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = '../index.html'
})