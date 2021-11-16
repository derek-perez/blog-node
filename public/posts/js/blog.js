// URL'S
const articulos = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/'
    : 'https://blogi-node.herokuapp.com/api/articulos/';

const usuarios = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const articulosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html?id='
    : 'https://blogi-node.herokuapp.com/posts/arts.html?id=';

// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const toggle = document.querySelector('.toggle');
const enlaces = document.querySelector('#enlaces');

const articulosLi = document.querySelectorAll('.articulosLi');

// Tomar ID
const params = new URLSearchParams(location.search);
const idAutor = params.get('id');

// Menú responsive
toggle.addEventListener('click', () => {
    enlaces.classList.toggle('active');
    toggle.classList.toggle('active');
})

// Modo oscuro
const checkbox = document.querySelector('#check');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
    toggle.classList.toggle('responsive');

    articulosLi.forEach(a => a.classList.toggle('dark'));
})

// Btns Flotantes
const abrirIconos = document.querySelector('.abrirIconos');
const btnsFlotantes = document.querySelector('.btnsFlotantes');
const chatbot = document.querySelector('.chatbot');

abrirIconos.addEventListener('click', () => {
    btnsFlotantes.classList.toggle('hidden');
    btnsFlotantes.classList.toggle('animate__bounceInRight');
    chatbot.classList.toggle('hidden');
    chatbot.classList.toggle('animate__bounceInRight');

    abrirIconos.classList.toggle('fa-ellipsis-h');
    abrirIconos.classList.toggle('fa-chevron-down');
    abrirIconos.classList.toggle('mover');
    abrirIconos.classList.toggle('animate__zoomInDown');
    abrirIconos.classList.toggle('animate__bounceInRight');
})

// Fetch para traer todos los artículos del usuario
const blogDeUsuario = document.querySelector('.blogDeUsuario');
const nombre = document.querySelector('.nombre');
const titulo = document.querySelector('.titulo');
const correo = document.querySelector('.correo');
const sobreMi = document.querySelector('.sobreMi');

fetch(usuarios + idAutor, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ usuario, articulos }) => {
        // Poner usuario
        nombre.innerHTML = usuario.nombre;
        correo.innerHTML = usuario.correo;
        titulo.innerHTML = usuario.titulo;
        sobreMi.innerHTML = usuario.descripcion;
    })
    .catch(console.log)