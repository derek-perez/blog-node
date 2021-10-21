// Referencias HTML
const body = document.querySelector('body');
const bienvenida = document.querySelector('.bienvenida');
const navBar = document.querySelector('.navBar');
const menu = document.querySelector('#enlaces');
const toggle = document.querySelector('.toggle');
const titles1 = document.querySelector('.titles1');
const titles2 = document.querySelector('.titles2');

const comentarios = document.querySelectorAll('.comentario');
const comentario = [].slice.call(comentarios);

const articulos = document.querySelectorAll('.articulo');
const articulo = [].slice.call(articulos);

// El aparecedor
window.addEventListener('scroll', () => {

    comentario.forEach(c => {
        let posicionObj0 = c.getBoundingClientRect().top;
        let tamañoDePantalla0 = window.innerHeight / 1;

        if (posicionObj0 < tamañoDePantalla0) {
            c.classList.add('animate__animated')
            c.classList.add('animate__bounceInRight')
        }
    })

    articulo.forEach(a => {
        let posicionObj1 = a.getBoundingClientRect().top;
        let tamañoDePantalla1 = window.innerHeight / 1;

        if (posicionObj1 < tamañoDePantalla1) {
            a.classList.remove('hidden')
            a.classList.add('animate__animated')
            a.classList.add('animate__bounceInLeft')
        }
    });
})

// Menú responsive
if (window.innerWidth <= 713) {
    toggle.classList.remove('hidden')

    toggle.onclick = () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    }
}


// Modo oscuro
const checkbox = document.getElementById('check');

checkbox.addEventListener('change', function () {
    body.classList.toggle('dark');
    bienvenida.classList.toggle('dark');
    navBar.classList.toggle('dark');
    menu.classList.toggle('dark');
    titles1.classList.toggle('dark')
    titles2.classList.toggle('dark')

    comentario.forEach(c => {
        c.classList.toggle('dark')
    });

    articulo.forEach(a => {
        a.classList.toggle('dark')
    });
});