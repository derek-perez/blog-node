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
    ? 'http://localhost:5500/public/posts/ctgr.html?id='
    : 'https://blogi-node.herokuapp.com/posts/ctgr.html?id=';

const articulosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html?id='
    : 'https://blogi-node.herokuapp.com/posts/arts.html?id=';

// Menú responsive
const menu = document.querySelector('#enlaces');
const toggle = document.querySelector('.toggle');

toggle.onclick = () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
}

// Mod oscuro
const checkbox = document.getElementById('check');
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const articulosEnGeneral = document.querySelector('.articulosEnGeneral');
const articulo = document.querySelector('.articulo');
const tituloDark = document.querySelector('#titulo');

checkbox.addEventListener('change', function () {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
    articulo.classList.toggle('dark');
    articulosEnGeneral.classList.toggle('dark');
    tituloDark.classList.toggle('dark');

    setTimeout(() => {
        const articulos = document.querySelectorAll('.articuloLi');
        const articulo = [].slice.call(articulos);
        articulo.forEach(a => a.classList.toggle('dark'));

        const articuloUltimo = document.querySelectorAll('.articuloUltimo');
        const articuloU = [].slice.call(articuloUltimo);
        articuloU.forEach(a => a.classList.toggle('dark'));

        const articulosDeCtg = document.querySelectorAll('.articuloDeCtg');
        const articuloDeCtg = [].slice.call(articulosDeCtg);
        articuloDeCtg.forEach(a => a.classList.toggle('dark'));

    }, 100);
});

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

// Fetch para obtener artículo y mostrarlo
const params = new URLSearchParams(location.search);
const idArticulo = params.get('id');

// Si no hay "id"...
if (idArticulo === null || idArticulo === undefined) {

    articulosEnGeneral.classList.toggle('hidden');
    articulo.classList.toggle('hidden');

    // Fetch para traer los ultimos 3
    fetch(articulos + 'ultimos', {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then((ultimosArticulos) => {
            ultimosArticulos.forEach(a => {

                const nombreDeAutor = a.autor[0].nombre;
                const nombreDeCtg = a.categoria[0].nombre;

                const ultimos3 = document.querySelector('.ultimos3');

                // Se crea el string para la fecha
                const fechaMal = a.creadoEn.split(' ');
                const arrayBuena = fechaMal.splice(0, 4);

                const dia = cambiarAEspañolDia(arrayBuena[0]);
                const mes = cambiarAEspañolMes(arrayBuena[1]);

                let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                const contenidoCortado = a.contenido.slice(0, 110);

                const contenido = contenidoCortado + '...';

                const html = `
                    <div class="articuloUltimo">
                        <img src="${a.img}" alt="Artículo reciente">
                        <span id="top">
                            <span class="primary">Autor:</span>
                            <span class="secondary">${nombreDeAutor}</span>
                        </span>
                        <span>
                            <span class="primary">Titulo:</span>
                            <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                        </span>
                        <span id="down">
                            <span class="primary">Categoría:</span>
                            <span class="secondary">${nombreDeCtg}</span>
                        </span>
                        <span id="descArticuloCarousel">${contenido}</span>
                        <span id="fechaArticuloCarousel">${fecha}</span>
                        <a id="botonVermas" href="${articulosPublic + a._id}">
                            <button class="btn btn-primary">Ver más</button>
                        </a>
                    </div>
                `;

                ultimos3.innerHTML += html;

            })
        })
        .catch(console.log)

    // Fetch para poner categorias
    fetch(categorias, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(({ categorias: ctgs }) => {
            ctgs.forEach(ctg => {

                // Elementos a manejar
                const articulosCtgUl = document.querySelector('.articulosCtgUl');

                // Obtener datos de la categoria
                const descripcion = ctg.description;
                const nombre = ctg.nombre;
                const _id = ctg._id;

                // Traer artículos de la categoría
                fetch(`${categorias}articulos/${_id}`, {
                    method: 'GET'
                })
                    .then(resp => resp.json())
                    .then(({ total, articulos: arts }) => {
                        if (total >= 1) {

                            const html = `
                                <li class="categoriaLi">
                                    <div class="content">
                                        <h3 class="categoriaTitulo">${nombre}</h3>
                                        <span class="descCategoria">${descripcion}</span>
                                    </div>
                                    <ul id="${_id}" class="articulosDeCtg">
                                    
                                    </ul>
                                </li>
                            `;

                            articulosCtgUl.innerHTML += html;

                            arts.forEach(a => {

                                const nombreDeAutor = a.autor[0].nombre;
                                const nombreDeCtg = a.categoria[0].nombre;
                                const idDeCtg = a.categoria[0]._id;

                                if (idDeCtg === _id) {
                                    const categoriasLi = document.querySelectorAll('.articulosDeCtg');
                                    const categoriaLi = [].slice.call(categoriasLi);

                                    categoriaLi.forEach(c => {
                                        if (c.id === _id) {
                                            const elBueno = c;
                                            console.log(elBueno)

                                            // Se crea el string para la fecha
                                            const fechaMal = a.creadoEn.split(' ');
                                            const arrayBuena = fechaMal.splice(0, 4);

                                            const dia = cambiarAEspañolDia(arrayBuena[0]);
                                            const mes = cambiarAEspañolMes(arrayBuena[1]);

                                            let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                                            const contenidoCortado = a.contenido.slice(0, 110);

                                            const contenido = contenidoCortado + '...';

                                            const html = `
                                                <li class="articuloDeCtg">
                                                    <img class="imgDeArticulos" src="${a.img}">
                                                    <span id="top">
                                                        <span class="primary">Autor:</span>
                                                        <span class="secondary">${nombreDeAutor}</span>
                                                    </span>
                                                    <span>
                                                        <span class="primary">Titulo:</span>
                                                        <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                                                    </span>
                                                    <span id="down">
                                                        <span class="primary">Categoría:</span>
                                                        <span class="secondary">${nombreDeCtg}</span>
                                                    </span>
                                                    <span class="contenidoDeArticulos">${contenido}</span>
                                                    <span class="fechaDeArticulos">${fecha}</span>
                                                    <a id="botonVermas" href="${articulosPublic + _id}">
                                                        <button class="btn btn-primary">Ver más...</button>
                                                    </a>
                                                </li>
                                            `;

                                            elBueno.innerHTML += html;
                                        }
                                    });
                                }
                            })

                        } else {
                            const html = `
                                <li id="${_id}" class="categoriaLi">
                                    <div class="content">
                                        <h3 class="categoriaTitulo">${nombre}</h3>
                                        <span class="descCategoria">${descripcion}</span>
                                        <div class="noHay">
                                            <img src="./img/void.png">
                                            <p>Aún no hay artículos en esta categoría</p>
                                        </div>
                                    </div>
                                </li>
                            `;

                            articulosCtgUl.innerHTML += html;
                        }
                    })
                    .catch(console.log)

            })
        })
        .catch(console.log)

} else {

    // Si hay "id"...
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
            document.title = a.titulo;
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


        fetch(articulos + 'usuario/' + id, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(articulos => {

                articulos.forEach(a => {

                    const nombreDeAutor = a.autor[0].nombre;
                    const nombreDeCtg = a.categoria[0].nombre;

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
                            <span id="top">
                                <span class="primary">Autor:</span>
                                <span class="secondary">${nombreDeAutor}</span>
                            </span>
                            <span>
                                <span class="primary">Titulo:</span>
                                <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                            </span>
                            <span id="down">
                                <span class="primary">Categoría:</span>
                                <span class="secondary">${nombreDeCtg}</span>
                            </span>
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

}
