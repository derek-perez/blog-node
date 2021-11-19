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

const buscadorUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/busquedas/?q='
    : 'https://blogi-node.herokuapp.com/busquedas/?q';

// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const toggle = document.querySelector('.toggle');
const spinner = document.querySelector('.spinner');
const enlaces = document.querySelector('#enlaces');

const articulosUl = document.querySelector('.articulosUl');

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
    setTimeout(() => {
        const articulosLi = document.querySelectorAll('.articulosLi');
        articulosLi.forEach(a => a.classList.toggle('dark'));

        const pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach(p => p.classList.toggle('dark'));
    }, 50);
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

// Buscador
const btnBuscador = document.querySelector('.btnBuscador');
const buscar = document.querySelector('#buscar');

btnBuscador.addEventListener('click', () => {
    spinner.classList.toggle('hidden');

    if (buscar.value === '') {
        location.reload();
    }

    setTimeout(() => {
        location.href = buscadorUrl + buscar.value;
    }, 500);
})

// Fetch para traer todos los artículos del usuario
const blogDeUsuario = document.querySelector('.blogDeUsuario');
const nombre = document.querySelector('.nombre');
const titulo = document.querySelector('.titulo');
const correo = document.querySelector('.correo');
const sobreMi = document.querySelector('.sobreMi');
const imgDePerfil = document.querySelector('.imgDePerfil');
const totalDeArticulos = document.querySelector('.totalDeArticulos');
const pagination = document.querySelector('.pagination');

const webLink = document.getElementById('webLink');
const twitterLink = document.getElementById('twitterLink');
const facebookLink = document.getElementById('facebookLink');
const linkedinLink = document.getElementById('linkedinLink');
const youtubeLink = document.getElementById('youtubeLink');

const ponerArticulos = (usuario, resp) => {
    // Poner usuario
    nombre.innerHTML = usuario.nombre;
    correo.innerHTML = usuario.correo;
    titulo.innerHTML = usuario.titulo;
    sobreMi.innerHTML = usuario.descripcion;
    imgDePerfil.src = usuario.img;

    if (usuario.twitter !== '') {
        twitterLink.href = `https://twitter.com/${usuario.twitter}`;
    } else {
        twitterLink.classList.toggle('hidden')
    }

    if (usuario.linkedin !== '') {
        linkedinLink.href = `https://linkedin.com/in/${usuario.linkedin}`;
    } else {
        linkedinLink.classList.toggle('hidden')
    }

    if (usuario.youtube !== '') {
        youtubeLink.href = `https://youtube.com/channel/${usuario.youtube}`;
    } else {
        youtubeLink.classList.toggle('hidden')
    }

    if (usuario.facebook !== '') {
        facebookLink.href = `https://facebook.com/${usuario.facebook}`;
    } else {
        facebookLink.classList.toggle('hidden')
    }

    if (usuario.web !== '') {
        webLink.href = usuario.web;
    } else {
        webLink.classList.toggle('hidden')
    }

    // Poner artículos
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

    const articulos = resp.docs;

    totalDeArticulos.innerHTML = resp.totalDocs;

    articulosUl.innerHTML = '';

    articulos.forEach(a => {

        // Se crea el string para la fecha
        const fechaMal = a.creadoEn.split(' ');
        const arrayBuena = fechaMal.splice(0, 4);

        const dia = cambiarAEspañolDia(arrayBuena[0]);
        const mes = cambiarAEspañolMes(arrayBuena[1]);

        let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

        const contenidoCortado = a.contenido.slice(0, 110);

        const html = `
            <li class="articulosLi">
                <img src="${a.img}" alt="Artículo reciente">
                <span id="top">
                    <span class="primary">Categoría: </span>
                    <span>${a.categoria[0].nombre}</span>
                </span>
                <span id="down">
                    <span class="primary">Titulo:</span>
                    <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                </span>
                <span id="descArticuloCarousel">${contenidoCortado}</span>
                <span id="fechaArticuloCarousel">${fecha}</span>
                <a id="botonVermas" href="${articulosPublic + a._id}">
                    <button class="btn btn-primary">Ver más</button>
                </a>
            </li>
        `;

        articulosUl.innerHTML += html;
    })
}

fetch(usuarios + idAutor, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ blog, usuario, resp }) => {

        ponerArticulos(usuario, resp);

        const ponerPaginacion = () => {

            const siguientes = resp.totalPages;

            for (let i = 0; i < siguientes; i++) {

                const myFunc = num => Number(num);

                const deste = Array.from(String(i), myFunc)

                deste.forEach(n => {
                    const html = `
                        <li class="page-item" style="margin-left: 10px;">
                            <span id="${n + 1}" class="page-link">${n + 1}</span>
                        </li>
                    `;

                    pagination.innerHTML += html;

                    setTimeout(() => {
                        const pageLinks = document.querySelectorAll('.page-link');
                        const pageLink = [].slice.call(pageLinks);

                        pageLink.forEach(p => {

                            p.addEventListener('click', () => {

                                spinner.classList.remove('hidden');

                                setTimeout(() => {
                                    const paginaRequerida = p.id;

                                    fetch(usuarios + 'page/', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ id: idAutor, page: paginaRequerida })
                                    })
                                        .then(response => response.json())
                                        .then(resp => {
                                            ponerArticulos(usuario, resp.resp);
                                        })
                                        .catch(console.error)
                                        .finally(() => {
                                            spinner.classList.add('hidden');
                                        })
                                }, 500);

                            })
                        })

                    }, 500);
                })
            }

        }

        ponerPaginacion();

        // Poner blog(s)
        blog.forEach(b => {
            blogDeUsuario.innerHTML += `${b.titulo}; `;
        })

    })
    .catch(console.log)