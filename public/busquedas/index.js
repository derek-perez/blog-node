// URL'S
const articulos = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/'
    : 'https://blogi-node.herokuapp.com/api/articulos/';

const articulosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html?id='
    : 'https://blogi-node.herokuapp.com/posts/arts.html?id=';

const blogsPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/blog.html?id='
    : 'https://blogi-node.herokuapp.com/posts/blog.html?id=';

// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const toggle = document.querySelector('.toggle');
const spinner = document.querySelector('.spinner');
const enlaces = document.querySelector('#enlaces');

const articulosUl = document.querySelector('.articulos');


// Menú responsive
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

// Obtener parámetro par la búsqueda
const params = new URLSearchParams(location.search);
const busqueda = params.get('q');

// Función para cambiar de Inglés a Español
const diasEspañol = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

const mesesEspañol = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

const cambiarAEspañolDia = (dia) => {

    let diaBueno = '';

    if (dia === 'Mon') {
        diaBueno = diasEspañol[0];
    } else if (dia === 'Tue') {
        diaBueno = diasEspañol[1]
    } else if (dia === 'Wen') {
        diaBueno = diasEspañol[2]
    } else if (dia === 'Thu') {
        diaBueno = diasEspañol[3]
    } else if (dia === 'Fri') {
        diaBueno = diasEspañol[4]
    } else if (dia === 'Sat') {
        diaBueno = diasEspañol[5]
    } else if (dia === 'Sun') {
        diaBueno = diasEspañol[6]
    }

    return diaBueno;
}

const cambiarAEspañolMes = (mes) => {

    let mesBueno = '';

    if (mes === 'Jan') {
        mesBueno = mesesEspañol[0];
    } else if (mes === 'Feb') {
        mesBueno = mesesEspañol[1]
    } else if (mes === 'Mar') {
        mesBueno = mesesEspañol[2]
    } else if (mes === 'Apr') {
        mesBueno = mesesEspañol[3]
    } else if (mes === 'May') {
        mesBueno = mesesEspañol[4]
    } else if (mes === 'Jun') {
        mesBueno = mesesEspañol[5]
    } else if (mes === 'Jul') {
        mesBueno = mesesEspañol[6]
    } else if (mes === 'Aug') {
        mesBueno = mesesEspañol[7]
    } else if (mes === 'Sep') {
        mesBueno = mesesEspañol[8]
    } else if (mes === 'Oct') {
        mesBueno = mesesEspañol[9]
    } else if (mes === 'Nov') {
        mesBueno = mesesEspañol[10]
    } else if (mes === 'Dec') {
        mesBueno = mesesEspañol[11]
    }

    return mesBueno;
}


fetch(articulos + 'buscar/' + busqueda, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(articulos => {
        articulos.forEach(a => {

            // Se crea el string para la fecha
            const fechaMal = a.creadoEn.split(' ');
            const arrayBuena = fechaMal.splice(0, 4);

            const dia = cambiarAEspañolDia(arrayBuena[0]);
            const mes = cambiarAEspañolMes(arrayBuena[1]);

            let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

            const contenidoCortado = a.contenido.slice(0, 110);

            const contenido = contenidoCortado + '...';

            const html = `
                <li class="articulo animate__animated">
                    <img src="${a.img}" alt="Img de artículo">
                    <br>
                    <span class="contenidoDad">
                        <span class="contenido"> Autor:</span>
                        <a href="${a.autor[0]._id}" style="color: white;">${a.autor[0].nombre}</a>
                    </span>
                    <p class="titleDad">
                        <span class="title"> Título:</span><span>${a.titulo}</span>
                    </p>
                    <span>
                        <span class="primary">Categoría: </span>
                        <span>${a.categoria[0].nombre}</span>
                    </span>
                    <br>
                    <span style="padding: 0px 20px;">${contenido}</span>
                    <br>
                    <p class="fecha">${fecha}</p>
                    <br>
                    <a href="${articulosPublic + a._id}">
                        <button class="verMas btn btn-primary">Ver artículo completo</button>
                    </a>
                </li>
            `;

            articulosUl.innerHTML += html;
        })
    })
    .catch(console.log)
    .finally(() => {
        spinner.classList.toggle('hidden');
    })