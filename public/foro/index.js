// Url's


// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const foro = document.querySelector('.foro');

// Modo oscuro
const checkbox = document.querySelector('#check');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
    foro.classList.toggle('dark');
})

// Menú responsive
const toggle = document.querySelector('.toggle');
const enlaces = document.querySelector('#enlaces');

toggle.addEventListener('click', () => {
    enlaces.classList.toggle('active');
    toggle.classList.toggle('active');
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

// Obtener token
const token = localStorage.getItem('token');

const crearBlog = document.querySelector('.crearBlog');
const nuevaDiscusion = document.querySelector('.nuevaDiscusion');

if (token === null) {
    nuevaDiscusion.classList.add('hidden');
} else if (token !== null) {
    crearBlog.classList.add('hidden');
}

// Escribir discusion
const Texto = document.querySelector('#descripcion');
const resultadoTextarea = document.querySelector('#resultadoTextarea');

const espacio = () => {

    const arrTextarea = Texto.value.split('\n');
    const arrResult = [];

    arrTextarea.forEach(t => {
        const parrafo2 = document.createElement('p');
        parrafo2.innerHTML = t;

        arrResult.push(parrafo2.innerHTML);
        setTimeout(() => {
            resultadoTextarea.innerHTML = arrResult.join('<br>');
        }, 100)
    })
}

descripcion.addEventListener('keydown', () => {
    espacio();
})