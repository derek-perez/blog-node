// URL'S
const articulos = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/'
    : 'https://blogi-node.herokuapp.com/api/articulos/';

const usuarios = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const categorias = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/categorias/'
    : 'https://blogi-node.herokuapp.com/api/categorias/';

const categoriasPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/articulos/ctgr.html?id='
    : 'https://blogi-node.herokuapp.com/articulos/ctgr.html?id=';

const articulosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/articulos/arts.html?id='
    : 'https://blogi-node.herokuapp.com/articulos/arts.html?id=';

// Menú responsive
const menu = document.querySelector('#enlaces');
const toggle = document.querySelector('.toggle');

toggle.onclick = () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
}

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

// Fetch para obtener artículo y mostrarlo
const params = new URLSearchParams(location.search);
const idArticulo = params.get('id');

const contenidoCuerpo = document.querySelector('#contenidoCuerpo');
const fecha = document.querySelector('#fecha');
const portada = document.querySelector('#portada');
const titulo = document.querySelector('#titulo');

const idDeUsuario = [];

fetch(articulos + idArticulo, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(a => {
        portada.src = a.img;
        titulo.innerHTML = a.titulo;
        contenidoCuerpo.innerHTML = a.htmlContenido;
        idDeUsuario.unshift(a.autor[0]._id);
    })
    .catch(console.log)

// Personalizar perfil de autor
setTimeout(() => {

    const id = idDeUsuario.shift();

    const imgDePerfil = document.querySelector('#imgDePerfil');
    const nombreDeAutor = document.querySelector('#nombreDeAutor');
    const correoDeAutor = document.querySelector('#correoDeAutor');
    const articulosDeAutor = document.querySelector('#articulosDeAutor');

    fetch(usuarios + id, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(u => {
            imgDePerfil.src = u.usuario.img;
            nombreDeAutor.innerHTML = u.usuario.nombre;
            correoDeAutor.innerHTML = u.usuario.correo;
            articulosDeAutor.innerHTML = u.articulos.length;
        })
        .catch(console.log)

    // Poner articulos de usuario
    const articulosUl = document.querySelector('.articulosUl');

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

    fetch(articulos + 'usuario/' + id, {
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
                    <li class="articuloLi">
                        <img class="imgDeArticulos" src="${a.img}">
                        <span class="tituloDeArticulos">${a.titulo}</span>
                        <span class="contenidoDeArticulos">${contenido}</span>
                        <span class="fechaDeArticulos">${fecha}</span>
                        <button class="btn btn-primary">
                            <a href="${articulosPublic + a._id}">Ver artículo completo</a>
                        </button>
                    </li>
                `;

                articulosUl.innerHTML += html;
            })
        })
        .catch(console.log)

}, 1000);

// Traer categorías
const categoriasUl = document.querySelector('.categoriasUl');

fetch(categorias, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ categorias }) => {
        categorias.forEach(c => {
            categoriasUl.innerHTML += `
                <li><a href="${categoriasPublic + c._id}">${c.nombre}</a></li>
            `;
        })
    })
    .catch(console.log)