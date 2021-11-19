// Url's
const validarJwt = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const blogUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/blog/'
    : 'https://blogi-node.herokuapp.com/api/blog/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');

const spinner = document.querySelector('.spinner');
const login = document.querySelector('.login');
const irARegister = document.querySelector('.irARegister');

const config = document.querySelector('.config');

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
    const login = document.querySelector('.login');
    const irARegister = document.querySelector('.irARegister');

    login.classList.remove('hidden');

    irARegister.classList.add('pocoApoco');
    irARegister.href = public + 'auth.html';

    setTimeout(() => {
        window.location.href = public + 'auth.html';
    }, 10000);
}

// Menú responsive
const toggle = document.querySelector('.toggle');
const enlaces = document.querySelector('#enlaces');

toggle.addEventListener('click', () => {
    enlaces.classList.toggle('active')
    toggle.classList.toggle('active')
})

// Modo oscuro
const checkbox = document.querySelector('#check');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
})

// Fetch para mostrar propiedades del blog
const idDeBlog = localStorage.getItem('blog');
const nombre = document.querySelector('#nombre');
const descripcion = document.querySelector('#descripcion');

fetch(blogUrl + idDeBlog, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(blog => {
        const blogTraido = blog[0];

        nombre.value = blogTraido.titulo;
        descripcion.value = blogTraido.descripcion;

    })
    .catch(console.log)

// Borrar blog
const borrarBtn = document.querySelector('.borrarBtn');
const windowDanger = document.querySelector('.windowDanger');
const cancelar = document.querySelector('.cancelar');
const borrarDefinitivamente = document.querySelector('.borrarDefinitivamente');

borrarBtn.addEventListener('click', () => {
    windowDanger.classList.toggle('hidden');

    cancelar.addEventListener('click', () => {
        windowDanger.classList.toggle('hidden');
    })

    borrarDefinitivamente.addEventListener('click', () => {
        fetch(blogUrl + idDeBlog, {
            method: 'DELETE',
            headers: { 'x-token': token }
        })
            .then(resp => resp.json())
            .then(location.href = public + 'blog/articulos/')
            .catch(console.log)
    })

})

// Actualizar blog
const guardar = document.querySelector('.guardar');

guardar.addEventListener('click', () => {

    const data = {
        'titulo': nombre.value,
        'descripcion': descripcion.value
    }

    fetch(blogUrl + idDeBlog, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': `${token}`
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(location.reload())
        .catch(console.log)

})