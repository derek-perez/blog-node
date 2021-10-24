// Referencias HTML
const body = document.querySelector('body');
const bienvenida = document.querySelector('.bienvenida');
const navBar = document.querySelector('.navBar');
const menu = document.querySelector('#enlaces');
const toggle = document.querySelector('.toggle');
const titles1 = document.querySelector('.titles1');
const titles2 = document.querySelector('.titles2');
const ulArticulos = document.querySelector('.ulArticulos');

const comentarios = document.querySelectorAll('.comentario');
const comentario = [].slice.call(comentarios);

const articulos = document.querySelectorAll('.articulo');
const articulo = [].slice.call(articulos);

// URL's
const ultimos3 = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/ultimos'
    : 'https://blogi-node.herokuapp.com/api/articulos/ultimos';

const urlParaCategoria = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/categorias/obtenerIDS/'
    : 'https://blogi-node.herokuapp.com/api/categorias/obtenerIDS/';

const articulosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/public/blog/articulos/arts.html?id='
    : 'https://blogi-node.herokuapp.com/blog/articulos/arts.html?id=';

const categorias = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/public/blog/categorias/ctgr.html?id='
    : 'https://blogi-node.herokuapp.com/blog/categorias/ctgr.html?id=';

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
if (window.innerWidth <= 800) {
    toggle.classList.remove('hidden')

    toggle.onclick = () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    }
} else {
    toggle.classList.add('hidden')
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

    setTimeout(() => {
        const articulos = document.querySelectorAll('.articulo');
        const articulo = [].slice.call(articulos);
        articulo.forEach(a => {
            a.classList.toggle('dark')
        });
    }, 100);
});

// Fetch para últimos 3
fetch(ultimos3, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(articulosResp => {

        articulosResp.forEach(a => {

            const html = `
                    <div class="articulo col-sm">
                        <img src="${a.img}" alt="Img de artículo">
                        <br>
                        <a href="${categorias + a.categoria}" title="${a.categoria}" class="categoria">
                            Categoría: <span class="categoriaHttp">${a.categoria}</span>
                        </a>
                        <br>
                        <p class="titleDad">
                            <span class="title"> Título:</span><span> ${a.titulo} </span>
                        </p>
                        <br>
                        <p class="contenido">
                            ${a.contenido}
                        </p>
                        <p class="fecha">${a.creadoEn}</p>
                        <button class="verMas btn btn-primary">
                            <a href="${articulosUrl + a._id}">Ver artículo completo</a>
                        </button>
                    </div>
                `;

            ulArticulos.innerHTML += html;
        })
    })