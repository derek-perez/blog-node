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

const pushUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/push/'
    : 'https://blogi-node.herokuapp.com/api/push/';

const articulosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html?id='
    : 'https://blogi-node.herokuapp.com/posts/arts.html?id=';

const blogPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/blog.html?id='
    : 'https://blogi-node.herokuapp.com/posts/blog.html?id=';

const buscadorUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/busquedas/?q='
    : 'https://blogi-node.herokuapp.com/busquedas/?q';

const articulosPublicGeneral = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html'
    : 'https://blogi-node.herokuapp.com/posts/arts.html';

// Meter SW para notificaciones
let swReq;

if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../sw.js')
            .then((reg) => {
                swReq = reg;
            })
            .catch(console.log)
    });
}

// Menú responsive
const menu = document.querySelector('#enlaces');
const toggle = document.querySelector('.toggle');

toggle.onclick = () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
}

// Modo oscuro
const checkbox = document.getElementById('check');
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const spinner = document.querySelector('.spinner');
const articulosEnGeneral = document.querySelector('.articulosEnGeneral');
const articulo = document.querySelector('.articulo');
const tituloDark = document.querySelector('#titulo');
const compartir = document.querySelector('.compartir');

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

// Buscador
const btnBuscador = document.querySelector('.btnBucador');
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

buscar.addEventListener('keypress', (e) => {
    if (e.charCode === 13) {
        spinner.classList.toggle('hidden');

        if (buscar.value === '') {
            location.reload();
        }

        setTimeout(() => {
            location.href = buscadorUrl + buscar.value;
        }, 500);
    }
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
                            <a href="${blogPublic + a.autor[0]._id}" style="color: white;">${nombreDeAutor}</a>
                        </span>
                        <span>
                            <span class="primary">Titulo:</span>
                            <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                        </span>
                        <span id="down">
                            <span class="primary">Categoría: </span>
                            <span>${a.categoria[0].nombre}</span>
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

                        if (total > 0) {

                            const html = `
                                <li id="${_id}" class="categoriaLi">
                                    <div class="content">
                                        <h3 class="categoriaTitulo">${nombre}</h3>
                                        <span class="descCategoria">${descripcion}</span>
                                    </div>
                                    <ul title="${_id}" class="articulosDeCtg">
                                    
                                    </ul>
                                </li>
                            `;

                            articulosCtgUl.innerHTML += html;

                            setTimeout(() => {
                                // Si se busca a tutoriales
                                const tutos = location.hash;

                                if (tutos !== '') {
                                    document.getElementById('6186efa6cf94729df2c6fa9e').scrollIntoView();
                                }
                            }, 150);

                            arts.forEach(a => {

                                const nombreDeAutor = a.autor[0].nombre;
                                const nombreDeCtg = a.categoria[0].nombre;
                                const idDeCtg = a.categoria[0]._id;

                                if (idDeCtg === _id) {
                                    const categoriasLi = document.querySelectorAll('.articulosDeCtg');
                                    const categoriaLi = [].slice.call(categoriasLi);

                                    categoriaLi.forEach(c => {
                                        if (c.title === _id) {
                                            const elBueno = c;

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
                                                        <a href="${blogPublic + a.autor[0]._id}" style="color: white;">${nombreDeAutor}</a>
                                                    </span>
                                                    <span>
                                                        <span class="primary">Titulo:</span>
                                                        <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                                                    </span>
                                                    <span id="down">
                                                        <span class="primary">Categoría: </span>
                                                        <span>${a.categoria[0].nombre}</span>
                                                    </span>
                                                    <span class="contenidoDeArticulos">${contenido}</span>
                                                    <span class="fechaDeArticulos">${fecha}</span>
                                                    <a id="botonVermas" href="${articulosPublic + a._id}">
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

    // Preguntar si quiere notificaciones
    window.addEventListener('scroll', () => {

        const notificarme = () => {

            if (!window.Notification) {
                return console.log('Este navegador no soporta notificaciones');
            }

            if (Notification.permission === 'granted') {
                const getPublicKey = () => {
                    return fetch(pushUrl + 'key')
                        .then(res => res.arrayBuffer())
                        .then(key => new Uint8Array(key));
                }

                if (!swReq) return;

                getPublicKey()
                    .then(key => {
                        swReq.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: key
                        })
                            .then(res => res.toJSON())
                            .then(suscripcion => {

                                fetch(pushUrl + 'subscribe', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(suscripcion)
                                })
                                    .then(resp => resp.json())
                                    .catch(console.log);
                            });
                    });
            } else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
                Notification.requestPermission(function (permission) {
                    if (permission === 'granted') {
                        function getPublicKey() {
                            return fetch(pushUrl + 'key')
                                .then(res => res.arrayBuffer())
                                .then(key => new Uint8Array(key));
                        }
                        if (!swReq) return;

                        getPublicKey().then(key => {
                            swReq.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: key
                            })
                                .then(res => res.toJSON())
                                .then(suscripcion => {
                                    fetch(pushUrl + 'subscribe', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(suscripcion)
                                    })
                                        .then(resp => resp.json())
                                        .catch(console.log);
                                });
                        });
                    }
                });
            } else if (Notification.permission === 'denied') {
                console.log('denied')
            }
        }

        const altura = compartir.getBoundingClientRect().top;

        if (Notification.permission === 'denied') {
            return;
        } else if (Notification.permission !== 'granted' || Notification.permission === 'default') {
            if (altura <= 150) {
                const quiereNotifications = document.querySelector('.quiereNotifications');
                const noQuiero = document.querySelector('.noQuiero');
                const siQuiero = document.querySelector('.siQuiero');

                quiereNotifications.classList.remove('hidden');

                siQuiero.addEventListener('click', () => {
                    notificarme();
                    quiereNotifications.classList.toggle('hidden');
                })

                noQuiero.addEventListener('click', () => {
                    quiereNotifications.style.display = 'none'
                })

                quiereNotifications.addEventListener('click', () => {
                    quiereNotifications.style.display = 'none'
                })
            }
        }

    })

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

            const compartirArticulo = () => {
                const compartido = document.querySelector('.compartido');
                const noCompartido = document.querySelector('.noCompartido');

                compartir.addEventListener('click', async () => {
                    const dataSend = {
                        'text': `${a.titulo}\n`,
                        'url': `${articulosPublic + a._id}`
                    }

                    try {
                        await navigator.share(dataSend);
                        compartido.classList.toggle('hidden');
                    } catch (error) {
                        noCompartido.classList.toggle('hidden');
                    }
                })
            }

            compartirArticulo();
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
                articulosDeAutor.innerHTML = u.resp.totalDocs;
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
                                <a href="${blogPublic + a.autor[0]._id}" style="color: white;">${nombreDeAutor}</a>
                            </span>
                            <span>
                                <span class="primary">Titulo:</span>
                                <span class="secondary" id="tituloArticuloCarousel">${a.titulo}</span>
                            </span>
                            <span id="down">
                                <span class="primary">Categoría: </span>
                                <span>${a.categoria[0].nombre}</span>
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
                    <li>${c.nombre}</li>
                `;
            })
        })
        .catch(console.log)

}