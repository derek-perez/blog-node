// Url
const validarJwt = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const uploadIMG = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/uploads/'
    : 'https://blogi-node.herokuapp.com/api/uploads/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

const perfilUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/blog/perfil/'
    : 'https://blogi-node.herokuapp.com/blog/perfil/';

const articulos = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/'
    : 'https://blogi-node.herokuapp.com/api/articulos/';

const obtenerCategorias = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/categorias/'
    : 'https://blogi-node.herokuapp.com/api/categorias/';

const usuarios = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const blogUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/blog/'
    : 'https://blogi-node.herokuapp.com/api/blog/';

const pushUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/push/'
    : 'https://blogi-node.herokuapp.com/api/push/';

const articulosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/arts.html?id='
    : 'https://blogi-node.herokuapp.com/posts/arts.html?id=';

// Meter SW para notificaciones
let swReq;

if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../../sw.js')
            .then((reg) => {
                swReq = reg;
            })
            .catch(console.log)
    });
}

// Referencias HTML
const body = document.querySelector('body')
const login = document.querySelector('.login');

const irARegister = document.querySelector('.irARegister');

const blog = document.querySelector('.blog');
const spinner = document.querySelector('.spinner');

const toggle = document.querySelector('.toggle');
const enlaces = document.querySelector('#enlaces');

const userAccount = document.querySelector('.userAccount');
const userImg = document.querySelector('.userImg');
const userImgAccount = document.querySelector('.userImgAccount');
const nombre = document.querySelector('.nombre');
const correo = document.querySelector('.correo');
const cerrarSesion = document.querySelector('.cerrarSesion');

const blogsTitles = document.querySelector('.blogsTitles');
const tusBlogsWindow = document.querySelector('.tusBlogsWindow');
const menuBlog = document.querySelector('.menuBlog');
const menuDoor = document.querySelector('.menuDoor');
const itemsBlog = document.querySelectorAll('.itemBlog');
const close = document.querySelector('.close');

const sinCtg = document.querySelector('.sinCtg');
const sinCtgBtn = document.querySelector('.sinCtgBtn');

const resultadosDeMenu = document.querySelector('.resultadosDeMenu');
const articulosResultados = document.querySelector('.articulosResultados');
const noHay = document.querySelector('.noHay');

const blogIdActual = document.querySelector('#blogIdActual');
const blogActualLista = document.querySelector('.blogActualLista');

let idDeUsuario;

// Verificar si está logueado y personalizar Navbar
blog.classList.add('hidden')
spinner.classList.remove('hidden');

const token = localStorage.getItem('token');

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
            // Personalizar Navbar
            userImg.src = usuario.img;
            userImgAccount.src = usuario.img;
            nombre.innerText = usuario.nombre;
            correo.innerText = usuario.correo;

        })
        .catch(err => {
            darChanceDeIrse();
        })
        .finally(() => {
            blog.classList.remove('hidden')
            spinner.classList.add('hidden');
        })
})

const darChanceDeIrse = () => {
    login.classList.remove('hidden');

    irARegister.href = public + 'auth.html';
    irARegister.classList.add('pocoApoco');

    setTimeout(() => {
        window.location.href = public + 'auth.html';
    }, 10000);
}

// Modo oscuro
const checkbox = document.getElementById('check');
const navBar = document.querySelector('.navBar');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
    menuBlog.classList.toggle('dark');
    toggle.classList.toggle('responsive');
})

// Menú responsive
toggle.addEventListener('click', () => {
    enlaces.classList.toggle('active')
    toggle.classList.toggle('active')
})

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

// Abrir cuadro de usuario
userImg.addEventListener('click', () => {
    userAccount.classList.toggle('hidden');
});

// Ver perfil
const verPerfil = document.getElementById('verPerfil');

setTimeout(() => {
    verPerfil.href = perfilUrl;
}, 500);

// Cerrar sesión
cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = public + 'index.html'
})

// Ver todos los blogs
blogsTitles.addEventListener('click', () => {
    tusBlogsWindow.classList.toggle('hidden')
})

tusBlogsWindow.addEventListener('click', () => {
    tusBlogsWindow.classList.toggle('hidden')
})

// Ver/Ocultar vista previa
const verPrevia = document.querySelector('.verPrevia');
const verTexto = document.querySelector('.verTexto');

verPrevia.addEventListener('click', () => {
    Texto.classList.toggle('hidden');
    resultado.classList.toggle('w-100');
})

verTexto.addEventListener('click', () => {
    Texto.classList.toggle('w-100');
    resultado.classList.toggle('hidden');
})

// Función para sacar id de Url e ir a ese elemento ocultando los demás
const aparecedorDeResultado = () => {
    const resultados = document.querySelectorAll('.resultado');
    const resultado = [].slice.call(resultados);

    const idConGato = window.location.hash;
    const idBueno = idConGato.slice(1, -1);

    resultado.forEach(r => {
        if (r.id.includes(idBueno)) {
            r.classList.remove('hidden');
        } else if (!r.id.includes(idBueno)) {
            r.classList.add('hidden');
        }
    })
}

window.addEventListener('DOMContentLoad', aparecedorDeResultado)

// Ir a configuracion
const configuracionLateral = document.querySelector('#configuracion');

configuracionLateral.addEventListener('click', () => {
    location.href = public + 'blog/configuracion/'
})

// Mostrar blog seleccionado desde la URL
let actualUrl = window.location.href;

const editArticulo = document.querySelector('.editArticulo');
const cerrarVentana = document.querySelector('.cerrarVentana');
const enviar = document.querySelector('.enviar');
let Texto = document.querySelector('#conHtml');
const escribirArticulos = document.querySelector('.escribirArticulos');
let tituloDeArticulo = document.querySelector('#titulo');

const idCtg = [];

const resultado = document.querySelector('#resultado');

const funcionesParaArticulos = () => {
    cerrarVentana.addEventListener('click', () => {
        editArticulo.classList.add('hidden');
        body.classList.remove('wC');
        blog.classList.remove('hidden');
    })

    // Hoja para editar/escribir artículo
    const negrita = document.querySelector('.negrita');
    const subrayado = document.querySelector('.subrayado');
    const cursiva = document.querySelector('.cursiva');

    const espacio = () => {

        const arrTextarea = Texto.value.split('\n');
        const arrResult = [];

        arrTextarea.forEach(t => {
            const parrafo2 = document.createElement('p');
            parrafo2.innerHTML = t;

            arrResult.push(parrafo2.innerHTML);
            setTimeout(() => {
                resultado.innerHTML = arrResult.join('<br>');
            }, 100);
        })
    }

    setTimeout(() => {
        espacio();
    }, 500);

    Texto.addEventListener('keydown', () => {
        espacio();
    })

    // Negrita, subrayado, cursiva
    const etiquetaStrong = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<b>${sel}</b>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }

    const etiquetaSubrayado = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<u>${sel}</u>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }

    const etiquetaCursiva = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<i>${sel}</i>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }

    negrita.addEventListener("click", () => {
        etiquetaStrong();
    });
    cursiva.addEventListener("click", () => {
        etiquetaCursiva();
    });
    subrayado.addEventListener("click", () => {
        etiquetaSubrayado();
    });

    // Alinear texto
    const abirAligns = document.querySelector('.abirAligns');
    const alignBtns = document.querySelector('.alignBtns');

    abirAligns.addEventListener('click', () => {
        alignBtns.classList.toggle('hidden')
    });

    const alignLeft = document.querySelector('.fa-align-left');
    const alignCenter = document.querySelector('.fa-align-center');
    const alignJustify = document.querySelector('.fa-align-justify');
    const alignRight = document.querySelector('.fa-align-right');

    const textAlignLeft = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<p class="alignLeft">${sel}</p>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }
    const textAlignCenter = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<p class="alignCenter">${sel}</p>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }
    const textAlignJustify = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<p class="alignJustify">${sel}</p>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }
    const textAlignRight = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<p class="alignRight">${sel}</p>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }

    alignLeft.addEventListener('click', () => {
        textAlignLeft();
        alignBtns.classList.toggle('hidden');
    })
    alignCenter.addEventListener('click', () => {
        textAlignCenter();
        alignBtns.classList.toggle('hidden');
    })
    alignJustify.addEventListener('click', () => {
        textAlignJustify();
        alignBtns.classList.toggle('hidden');
    })
    alignRight.addEventListener('click', () => {
        textAlignRight();
        alignBtns.classList.toggle('hidden');
    })

    // Letra de texto
    const abrirTextos = document.querySelector('.abrirTextos');
    const textBtns = document.querySelector('.textBtns');

    abrirTextos.addEventListener('click', () => {
        textBtns.classList.toggle('hidden')
    });

    const titulo = document.querySelector('.titulo');
    const subtitulo = document.querySelector('.subtitulo');
    const parrafo = document.querySelector('.parrafo');

    const tituloText = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<h1>${sel}</h1>`, desde, hasta, 'end');
            resultado.innerHTML = Texto.value;
        }
    }
    const subtituloText = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<h3>${sel}</h3>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }
    const parrafoText = () => {
        let desde = Texto.selectionStart;
        let hasta = Texto.selectionEnd;
        let elTexto = Texto.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            Texto.setRangeText(`<p>${sel}</p>`, desde, hasta, 'select');
            resultado.innerHTML = Texto.value;
        }
    }

    titulo.addEventListener('click', () => {
        tituloText();
        textBtns.classList.toggle('hidden')
    })
    subtitulo.addEventListener('click', () => {
        subtituloText();
        textBtns.classList.toggle('hidden')
    })
    parrafo.addEventListener('click', () => {
        parrafoText();
        textBtns.classList.toggle('hidden')
    })

    // Url e IMG
    const link = document.querySelector('.link');
    const img = document.querySelector('.img');

    const urlVentana = document.querySelector('.urlVentana');
    const imgVentana = document.querySelector('.imgVentana');

    const ponerUrl = document.querySelector('.ponerUrl');

    const imgDeVentana = document.querySelector('#imgDeVentana');
    const imgDentroDe = document.querySelector('#imgDentroDe');

    const ponerUrlDeImg = document.querySelector('.ponerUrlDeImg');
    const ponerDentro = document.querySelector('.ponerDentro');

    link.addEventListener('click', () => {
        urlVentana.classList.toggle('hidden');
    })

    ponerUrl.addEventListener('click', () => {
        urlVentana.classList.toggle('hidden');
    })

    img.addEventListener('click', () => {
        imgVentana.classList.toggle('hidden');
    })
    ponerDentro.addEventListener('click', () => {
        imgVentana.classList.toggle('hidden');
    })
    ponerUrlDeImg.addEventListener('click', () => {
        imgVentana.classList.toggle('hidden');
    })

    const insertAtCaret = (areaId, text) => {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var caretPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0, caretPos);
        var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
        txtarea.value = front + text + back;
        caretPos = caretPos + text.length;
        txtarea.selectionStart = caretPos;
        txtarea.selectionEnd = caretPos;
        txtarea.focus();
        txtarea.scrollTop = scrollPos;
    }

    ponerUrl.addEventListener('click', () => {

        const alias = document.querySelector('#alias').value;
        const link = document.querySelector('#link').value;

        insertAtCaret('conHtml', `<a href="${link}">${alias}</a>`);
    })

    const imgConUrl = () => {
        const urlImg = imgDeVentana.value;

        if (urlImg.includes('data:image/')) {
            alert('No se admite ese tipo de enlaces');

            imgDeVentana.classList.toggle('hidden');
        } else {
            insertAtCaret('conHtml', `<img src="${urlImg}" class="imgTextarea"></img>`);
        }

    }

    const imgFile = () => {

        var reader = new FileReader();

        reader.onload = function (e) {
            const imgFile = e.target.result;

            const data = { "archivo": `${imgFile}` };

            fetch(uploadIMG + 'subir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(url => {
                    insertAtCaret('conHtml', `<img src="${url}" class="imgTextarea"></img>`);
                })
                .catch(console.error)
        }

        reader.readAsDataURL(imgDentroDe.files[0]);
    }

    ponerUrlDeImg.addEventListener('click', imgConUrl);
    ponerDentro.addEventListener('click', imgFile);

    setTimeout(() => {
        const liCategoria = document.querySelectorAll('.liCategoria');

        liCategoria.forEach(l => {
            l.addEventListener('click', () => {
                idCtg.unshift(l.id);
            })
        })
    }, 1000);

}

// Poner categorías y subir artículo
const categoriasLista = document.querySelector('#categoriasLista');
const totalDeCategorias = document.querySelector('#totalDeCategorias');

fetch(obtenerCategorias, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ categorias, total }) => {
        totalDeCategorias.innerHTML = total;

        categorias.forEach(c => {
            const html = `
                <li class="liCategoria" title="${c.description}" id="${c._id}">${c.nombre}</li>
            `;

            categoriasLista.innerHTML += html;
        })

    })

let boolean = true;

// Botón que crea articulo
enviar.addEventListener('click', () => {

    const imgParaArticulo = document.querySelector('.imgParaArticulo');
    const siPortada = document.querySelector('.siPortada');
    const noPortada = document.querySelector('.noPortada');

    imgParaArticulo.classList.toggle('hidden');

    // Si no quiere una img principal
    noPortada.addEventListener('click', () => {

        const ids = idCtg.shift();

        if (ids === undefined) {
            imgParaArticulo.classList.toggle('hidden');
            sinCtg.classList.toggle('hidden');

            sinCtgBtn.onclick = () => {
                sinCtg.classList.toggle('hidden');
            }
        } else if (ids !== undefined) {
            editArticulo.classList.toggle('hidden');
            spinner.classList.toggle('hidden');

            fetch(blogUrl + blogId, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(blog => {

                    const data = {
                        'titulo': `${tituloDeArticulo.value}`,
                        'contenido': `${resultado.innerText}`,
                        'htmlContenido': `${resultado.innerHTML}`,
                        'textarea': `${Texto.value}`,
                        'blog': `${blogId}`,
                        'categoria': `${ids}`,
                        'autor': `${idDeUsuario}`,
                        'public': `${boolean}`,
                    };

                    let headersList = {
                        "x-token": `${token}`,
                        "Content-Type": "application/json"
                    }

                    fetch(articulos, {
                        method: 'POST',
                        headers: headersList,
                        body: JSON.stringify(data)
                    })
                        .then(resp => resp.json())
                        .then(a => {
                            const body = {
                                "titulo": `Nuevo artículo`,
                                "body": `${a.titulo}`,
                                "dir": `https://blogi-node.herokuapp.com/posts/arts.html?id=${a._id}`
                            }
                            fetch(pushUrl, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-token': `${token}`
                                }
                            })
                                .then(location.reload())
                                .catch(console.log)
                        })
                        .catch(console.error)

                })
                .catch(console.log)
        }


    })

    // Si quiere que tenga img de Portada...
    siPortada.addEventListener('click', () => {

        const portadaPeticion = document.querySelectorAll('.portadaPeticion');

        portadaPeticion.forEach(p => {
            p.classList.toggle('hidden');
        })

        const imgPortadaUrlBtn = document.querySelector('.imgPortadaUrl');
        const imgPortadaUrl = document.querySelector('#imgPortadaUrl');
        const imgPortadaFileArchivo = document.querySelector('#imgPortadaFile');
        const imgPortadaFile = document.querySelector('.imgPortadaFile');

        const imgConUrl = () => {

            const urlImg = imgPortadaUrl.value;

            if (urlImg.includes('data:image/')) {
                alert('No se admite ese tipo de enlaces');

                imgParaArticulo.classList.add('hidden');
            } else {

                const ids = idCtg.shift();

                if (ids === undefined) {
                    imgParaArticulo.classList.toggle('hidden');
                    sinCtg.classList.toggle('hidden');

                    sinCtgBtn.onclick = () => {
                        sinCtg.classList.toggle('hidden');
                    }
                } else {
                    editArticulo.classList.toggle('hidden');
                    spinner.classList.toggle('hidden');

                    const data = {
                        'titulo': `${tituloDeArticulo.value}`,
                        'contenido': `${resultado.innerText}`,
                        'img': `${urlImg}`,
                        'htmlContenido': `${resultado.innerHTML}`,
                        'textarea': `${Texto.value}`,
                        'blog': `${blogId}`,
                        'categoria': `${ids}`,
                        'autor': `${idDeUsuario}`,
                        'public': `${boolean}`,
                    };

                    let headersList = {
                        "x-token": `${token}`,
                        "Content-Type": "application/json"
                    }

                    fetch(articulos, {
                        method: 'POST',
                        headers: headersList,
                        body: JSON.stringify(data)
                    })
                        .then(resp => resp.json())
                        .then(a => {
                            const body = {
                                "titulo": `Nueva discusión`,
                                "body": `${a.titulo}`,
                                "dir": `https://blogi-node.herokuapp.com/posts/arts.html?id=${a._id}`
                            }

                            fetch(pushUrl, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-token': `${token}`
                                }
                            })
                                .then(location.reload())
                                .catch(console.log)
                        })
                        .catch(console.error)
                }

            }


        }

        const imgFile = () => {

            var reader = new FileReader();

            reader.onload = async function (e) {
                const imgFile = e.target.result;

                const data = { "archivo": `${imgFile}` };

                await fetch(uploadIMG + 'subir', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(resp => resp.json())
                    .then(async url => {


                        const ids = idCtg.shift();

                        if (ids === undefined) {
                            imgParaArticulo.classList.toggle('hidden');
                            sinCtg.classList.toggle('hidden');

                            sinCtgBtn.onclick = () => {
                                sinCtg.classList.toggle('hidden');
                            }
                        } else {
                            editArticulo.classList.toggle('hidden');
                            spinner.classList.toggle('hidden');

                            const data = {
                                'titulo': `${tituloDeArticulo.value}`,
                                'contenido': `${resultado.innerText}`,
                                'img': `${url}`,
                                'htmlContenido': `${resultado.innerHTML}`,
                                'textarea': `${Texto.value}`,
                                'blog': `${blogId}`,
                                'categoria': `${ids}`,
                                'autor': `${idDeUsuario}`,
                                'public': `${boolean}`,
                            };

                            let headersList = {
                                "x-token": `${token}`,
                                "Content-Type": "application/json"
                            }

                            await fetch(articulos, {
                                method: 'POST',
                                headers: headersList,
                                body: JSON.stringify(data)
                            })
                                .then(resp => resp.json())
                                .then(a => {
                                    const body = {
                                        "titulo": `Nueva discusión`,
                                        "body": `${a.titulo}`,
                                        "dir": `https://blogi-node.herokuapp.com/posts/arts.html?id=${a._id}`
                                    }
                                    console.log(a.nombre, a.titulo)
                                    fetch(pushUrl, {
                                        method: 'POST',
                                        body: JSON.stringify(body),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'x-token': `${token}`
                                        }
                                    })
                                        .then(location.reload())
                                        .catch(console.log)
                                })
                                .catch(console.error)
                        }

                    })
                    .catch(console.error)
            }

            reader.readAsDataURL(imgPortadaFileArchivo.files[0]);
        }

        imgPortadaUrlBtn.addEventListener('click', imgConUrl);
        imgPortadaFile.addEventListener('click', imgFile);
    })

})

// Edición/Creación de un articulo
const crearArticulo = document.querySelector('#crearArticulo');

crearArticulo.addEventListener('click', () => {
    editArticulo.classList.remove('hidden');
    body.classList.add('wC');
    blog.classList.add('hidden');
    editArticulo.classList.add('animate__backInRight');
    Texto.value = '';
    tituloDeArticulo.value = '';
    funcionesParaArticulos();
})

// Borrar y editar artículo
const windowBorrarArticulo = document.querySelector('.windowBorrarArticulo');
const deleteArt = document.querySelector('.delete');
const closeDelete = document.querySelector('.closeDelete');


let blogId;

// Crear blog
const crearBlog = document.querySelector('.crearBlog');
const creacionDeBlog = document.querySelector('.creacionDeBlog');
const nombreDeBlog = document.getElementById('nombreDeBlog');
const descDeBlog = document.getElementById('descDeBlog');
const btnCrearblog = document.querySelector('#btnCrearBlog');

const mostrarYFuncionesParaArticulos = (arts) => {

    articulosResultados.innerHTML = '';
    arts.forEach(a => {

        setTimeout(() => {

            // Se crea el string para la fecha
            const fechaMal = a.creadoEn.split(' ');
            const arrayBuena = fechaMal.splice(0, 4);

            const dia = cambiarAEspañolDia(arrayBuena[0]);
            const mes = cambiarAEspañolMes(arrayBuena[1]);

            let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

            const contenidoCortado = a.contenido.slice(0, 110);

            const contenido = contenidoCortado + '...';

            const html = `
                <div class="articuloMini">
                    <div class="hidden compartido alert alert-success alert-dismissible fade show d-flex w-100 align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                        <div>Se ha compartido exitósamente</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div class="hidden noCompartido alert alert-danger alert-dismissible fade show d-flex w-100 align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                            No se ha podido enviar exitósamente.  favor, intpentelo más tarde
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div class="topArticle">
                        <img src="${a.img}" alt="Imagen de articulo" class="imgArticle">
                        <div class="articleText">
                            <span class="titleArticle">${a.titulo}</span>
                            <span class="descArticle">${contenido}</span>
                        </div>
                    </div>
                    <span class="fechaArticle">${fecha}</span>
                    <div class="buttons">
                        <div class="btnRow">
                            <a class="btnArticulo" href="${articulosUrl + a._id}">
                                <button class="wC btn btn-primary">Ver artículo</button>
                            </a>
                            <button id="${a._id}" class="btnArticulo actualizarArt btn btn-warning">Editar artículo</button>
                        </div>
                        <div class="btnRow">
                            <button id="${a._id}" class="btnArticulo compartirArticulo btn btn-success">Compartir artículo</button>
                            <button id="${a._id}" class="btnArticulo borrarArticulo btn btn-danger">Borrar artículo</button>
                        </div>
                    </div>
                </div>
            `;

            articulosResultados.innerHTML += html;

            const btnsParaCompartir = () => {

                const compartirArticulo = document.querySelectorAll('.compartirArticulo');

                const compartido = document.querySelector('.compartido');
                const noCompartido = document.querySelector('.noCompartido');

                compartirArticulo.forEach(c => {
                    c.addEventListener('click', () => {
                        const idDeArticulo = c.id;

                        fetch(articulos + idDeArticulo, {
                            method: 'GET'
                        })
                            .then(resp => resp.json())
                            .then(async a => {
                                const shareData = {
                                    'text': `${a.titulo}\n`,
                                    'url': `${articulosUrl + a._id}`
                                };

                                try {
                                    await navigator.share(shareData);
                                    compartido.classList.toggle('hidden')
                                } catch (error) {
                                    console.log(error)
                                    noCompartido.classList.toggle('hidden')
                                }
                            })
                            .catch(console.log)
                    })
                })
            }

            btnsParaCompartir();

            const btnsParaBorrarYAcyualizar = () => {
                // Borrar artículo
                const borrarArticulo = document.querySelectorAll('.borrarArticulo');
                borrarArticulo.forEach(a => {
                    a.addEventListener('click', () => {
                        const idParaBorrar = a.id;
                        windowBorrarArticulo.classList.toggle('hidden');

                        closeDelete.addEventListener('click', () => {
                            windowBorrarArticulo.classList.toggle('hidden');
                        })

                        deleteArt.addEventListener('click', () => {
                            fetch(articulos + idParaBorrar, {
                                method: 'DELETE',
                                headers: { "x-token": `${token}` }
                            })
                                .then(resp => resp.json())
                                .then(location.reload())
                                .catch(console.error)
                        })
                    })
                })

                // Editar artículo
                const actualizarArt = document.querySelectorAll('.actualizarArt');
                const actualizarBtn = document.querySelector('.actualizarBtn');

                actualizarArt.forEach(a => {
                    a.addEventListener('click', () => {

                        const idParaModificar = a.id;

                        fetch(articulos + idParaModificar, {
                            method: 'GET'
                        })
                            .then(resp => resp.json())
                            .then(a => {

                                const ctgAModificar = a.categoria;

                                Texto.innerHTML = a.textarea;
                                tituloDeArticulo.value = a.titulo;

                                blog.classList.toggle('hidden');
                                editArticulo.classList.toggle('hidden');
                                editArticulo.classList.add('edicion');
                                body.classList.add('wC');
                                actualizarBtn.classList.toggle('hidden');
                                enviar.classList.toggle('hidden');

                                cerrarVentana.addEventListener('click', () => {
                                    editArticulo.classList.add('hidden');
                                    editArticulo.classList.remove('edicion');
                                    actualizarBtn.classList.toggle('hidden');
                                    enviar.classList.toggle('hidden');
                                    blog.classList.remove('hidden');
                                })

                                funcionesParaArticulos();

                                // Botón para actualizar artículo
                                actualizarBtn.addEventListener('click', () => {

                                    const imgParaArticulo = document.querySelector('.imgParaArticulo');
                                    const siPortada = document.querySelector('.siPortada');
                                    const noPortada = document.querySelector('.noPortada');

                                    imgParaArticulo.classList.toggle('hidden');

                                    // Si quiere que tenga img de Portada...
                                    siPortada.addEventListener('click', () => {

                                        const portadaPeticion = document.querySelectorAll('.portadaPeticion');

                                        portadaPeticion.forEach(p => {
                                            p.classList.toggle('hidden');
                                        })

                                        const imgPortadaUrlBtn = document.querySelector('.imgPortadaUrl');
                                        const imgPortadaUrl = document.querySelector('#imgPortadaUrl');
                                        const imgPortadaFileArchivo = document.querySelector('#imgPortadaFile');
                                        const imgPortadaFile = document.querySelector('.imgPortadaFile');

                                        const imgConUrl = () => {
                                            const urlImg = imgPortadaUrl.value;

                                            if (urlImg.includes('data:image/')) {
                                                alert('No se admite ese tipo de enlaces');

                                                imgParaArticulo.classList.add('hidden');
                                            } else {

                                                editArticulo.classList.toggle('hidden');
                                                spinner.classList.toggle('hidden');

                                                const data = {
                                                    'titulo': `${tituloDeArticulo.value}`,
                                                    'contenido': `${resultado.innerText}`,
                                                    'img': `${urlImg}`,
                                                    'htmlContenido': `${resultado.innerHTML}`,
                                                    'textarea': `${Texto.value}`,
                                                    'blog': `${blogId}`,
                                                    'categoria': `${ctgAModificar}`,
                                                    'autor': `${idDeUsuario}`,
                                                    'public': `${boolean}`,
                                                };

                                                let headersList = {
                                                    "x-token": `${token}`,
                                                    "Content-Type": "application/json"
                                                }

                                                fetch(articulos + idParaModificar, {
                                                    method: 'PUT',
                                                    headers: headersList,
                                                    body: JSON.stringify(data)
                                                })
                                                    .then(resp => resp.json())
                                                    .then(a => location.reload())
                                                    .then(location.reload())
                                                    .catch(console.error)
                                                    .finally(() => {
                                                        location.reload()
                                                    })

                                            }


                                        }

                                        const imgFile = async () => {

                                            var reader = new FileReader();

                                            reader.onload = function (e) {
                                                const imgFile = e.target.result;

                                                const data = { "archivo": `${imgFile}` };

                                                fetch(uploadIMG + 'subir', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify(data)
                                                })
                                                    .then(resp => resp.json())
                                                    .then(async url => {
                                                        editArticulo.classList.toggle('hidden');

                                                        const data = {
                                                            'titulo': `${tituloDeArticulo.value}`,
                                                            'contenido': `${resultado.innerText}`,
                                                            'img': `${url}`,
                                                            'htmlContenido': `${resultado.innerHTML}`,
                                                            'textarea': `${Texto.value}`,
                                                            'public': `${boolean}`,
                                                        };

                                                        let headersList = {
                                                            "x-token": `${token}`,
                                                            "Content-Type": "application/json"
                                                        }

                                                        await fetch(articulos + idParaModificar, {
                                                            method: 'PUT',
                                                            headers: headersList,
                                                            body: JSON.stringify(data)
                                                        })
                                                            .then(resp => resp.json())
                                                            .then(location.reload())
                                                            .catch(console.error)
                                                            .finally(() => location.reload())
                                                    })
                                                    .catch(console.error)
                                            }

                                            reader.readAsDataURL(imgPortadaFileArchivo.files[0]);
                                        }

                                        imgPortadaUrlBtn.addEventListener('click', imgConUrl);
                                        imgPortadaFile.addEventListener('click', imgFile);
                                    })

                                    // Si no quiere una img principal
                                    noPortada.addEventListener('click', () => {
                                        editArticulo.classList.toggle('hidden');
                                        spinner.classList.toggle('hidden');

                                        const data = {
                                            'titulo': `${tituloDeArticulo.value}`,
                                            'contenido': `${resultado.innerText}`,
                                            'htmlContenido': `${resultado.innerHTML}`,
                                            'blog': `${blogId}`,
                                            'textarea': `${Texto.value}`,
                                            'public': `${boolean}`,
                                        };

                                        let headersList = {
                                            "x-token": `${token}`,
                                            "Content-Type": "application/json"
                                        }

                                        fetch(articulos + idParaModificar, {
                                            method: 'PUT',
                                            headers: headersList,
                                            body: JSON.stringify(data)
                                        })
                                            .then(resp => resp.json())
                                            .then(location.reload())
                                            .catch(console.error)
                                            .finally(() => {
                                                location.reload()
                                            })
                                    })
                                })
                            })
                            .catch(console.error);
                    })
                })
            }

            btnsParaBorrarYAcyualizar();


        }, 500);
    })
}

// Crear blog
crearBlog.addEventListener('click', () => {
    creacionDeBlog.classList.toggle('hidden');

    btnCrearblog.addEventListener('click', () => {
        const data = {
            'titulo': `${nombreDeBlog.value}`,
            'descripcion': `${descDeBlog.value}`,
            'autor': `${idDeUsuario}`
        }

        const headersList2 = {
            'x-token': `${token}`,
            'Content-Type': 'application/json'
        }

        fetch(blogUrl, {
            method: 'POST',
            headers: headersList2,
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(location.reload())
            .catch(console.log)
    })
})

// Borrar blog
const borrarBlog = document.querySelector('.borrarBlog');
const windowDanger = document.querySelector('.windowDanger');
const cancelar = document.querySelector('.cancelar');
const borrarDefinitivamente = document.querySelector('.borrarDefinitivamente');

borrarBlog.addEventListener('click', () => {

    windowDanger.classList.toggle('hidden');

    cancelar.addEventListener('click', () => {
        windowDanger.classList.toggle('hidden');
    })

    borrarDefinitivamente.addEventListener('click', () => {
        fetch(blogUrl + localStorage.getItem('blog'), {
            method: 'DELETE',
            headers: { 'x-token': token }
        })
            .then(resp => resp.json())
            .then(location.reload())
            .catch(console.log)
    })

})

// Poner blog
setTimeout(() => {

    fetch(blogUrl + 'usuario/' + idDeUsuario, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(b => {
            if (b.length === 0) {
                // Si es nuevo, intro al blog
                blog.classList.toggle('hidden')

                const introDeBlog = document.querySelector('.introDeBlog');

                const intro = document.querySelector('.intro');
                const crearlo = document.querySelector('.crearlo');
                const descripciones = document.querySelector('.descripciones');
                const aTutoriales = document.querySelector('.aTutoriales');

                const primerSiguiente = document.getElementById('primerSiguiente');
                const segundoSiguiente = document.getElementById('segundoSiguiente');
                const tercerSiguiente = document.getElementById('tercerSiguiente');
                const ultimoSiguiente = document.getElementById('ultimoSiguiente');

                const nombreDeBlogCrear = document.getElementById('nombreDeBlogCrear');
                const descDeBlogCrear = document.getElementById('descDeBlogCrear');

                introDeBlog.classList.remove('hidden');

                primerSiguiente.onclick = () => {
                    intro.classList.add('hidden');
                    crearlo.classList.remove('hidden');
                }

                segundoSiguiente.onclick = () => {
                    crearlo.classList.add('hidden');
                    descripciones.classList.remove('hidden');

                    const data2 = {
                        'titulo': `${nombreDeBlogCrear.value}`,
                        'descripcion': `${descDeBlogCrear.value}`,
                        'autor': `${idDeUsuario}`
                    }

                    const headersList3 = {
                        'x-token': `${token}`,
                        'Content-Type': 'application/json'
                    }

                    fetch(blogUrl, {
                        method: 'POST',
                        headers: headersList3,
                        body: JSON.stringify(data2)
                    })
                        .then(resp => resp.json())
                        .then(bN => {
                            blogIdActual.innerHTML = bN.titulo;
                            blogIdActual.id = bN._id;

                            const html = `
                                <span class="cambioDeBlog" title="${bN.titulo}" id="${bN.titulo}">${bN.titulo}</span>
                            `;

                            blogActualLista.innerHTML += html;
                        })
                        .catch(console.log)

                    tercerSiguiente.onclick = () => {
                        descripciones.classList.add('hidden');
                        aTutoriales.classList.toggle('hidden');
                    }

                    ultimoSiguiente.onclick = () => {
                        introDeBlog.classList.toggle('hidden');
                        blog.classList.toggle('hidden');
                    }
                }

            }

            b.forEach(bC => {

                const idDeBlog = bC._id;
                const nombreDeBlog = bC.titulo;

                const booleanBlog = bC.public;

                booleanBlog === false ? boolean = false : boolean = true;

                blogId = idDeBlog;

                localStorage.setItem('blog', idDeBlog);

                blogIdActual.innerHTML = nombreDeBlog;
                blogIdActual.id = idDeBlog;

                const html = `
                    <p class="cambioDeBlog" title="${nombreDeBlog},${booleanBlog}" id="${idDeBlog}">${nombreDeBlog}</p>
                `;

                blogActualLista.innerHTML += html;

            })
        })
        .catch(console.log)
        .finally(() => {
            // Cambio de blog
            const cambiosDeBlog = document.querySelectorAll('.cambioDeBlog');
            const cambioDeBlog = [].slice.call(cambiosDeBlog);

            const blogDelLS = localStorage.getItem('blog');

            cambioDeBlog.forEach(b => {

                b.addEventListener('click', () => {
                    const blogRequerido = b.id;

                    blogId = blogRequerido;

                    localStorage.removeItem('blog');
                    localStorage.setItem('blog', blogRequerido);

                    const bTitle = b.title.split(',');

                    blogIdActual.innerHTML = bTitle[0];
                    blogIdActual.id = blogRequerido;

                    const booleanBlog = Boolean(bTitle[1]);

                    booleanBlog === false ? boolean = false : boolean = true;

                    fetch(articulos + 'blog/' + blogRequerido, {
                        method: 'GET'
                    })
                        .then(resp => resp.json())
                        .then(({ articulos: arts }) => {

                            if (arts.length === 0) {
                                const html = `
                                    <div class="noHay">
                                        <img src="../img/void.png" alt="Todavía no tienes artículos">
                                        <p>Todavía no tienes artículos</p>
                                        <br>
                                        <p style="text-align: center;">
                                            Para escribir un artículo, presiona en el botón azúl
                                            <br>
                                            "Crear articulo", que se encuentra en el menú
                                        </p>
                                    </div>
                                `;

                                articulosResultados.innerHTML = html;
                            } else {
                                articulosResultados.innerHTML = '';
                                mostrarYFuncionesParaArticulos(arts);
                            }
                        })
                        .catch(console.log)
                })

                if (blogId === b.id) {

                    // Poner artículos de Blog
                    fetch(articulos + 'blog/' + blogDelLS, {
                        method: 'GET'
                    })
                        .then(resp => resp.json())
                        .then(({ articulos: arts }) => {

                            articulosResultados.innerHTML = '';
                            mostrarYFuncionesParaArticulos(arts);

                        })
                        .catch(console.log)
                }
            })
        })

}, 1000);

// Buscador
const btnBuscador = document.getElementById('btnBuscador');
const buscadorInput = document.getElementById('buscador');

const buscadorFunction = () => {
    const data = buscadorInput.value;

    if (data.length === 0) {
        location.reload();
    }

    spinner.classList.toggle('hidden');

    setTimeout(() => {
        fetch(articulos + 'buscarBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'blog': localStorage.getItem('blog'),
                'buscar': data
            })
        })
            .then(resp => resp.json())
            .then(articulos => {

                if (articulos.length !== 0) {
                    mostrarYFuncionesParaArticulos(articulos)
                } else {
                    const html = `
                        <div class="busquedaMala">
                            <img src="../img/void.png" alt="Todavía no tienes artículos">
                            <p>No hay artículos que coincidan con la búsqueda</p>
                        </div>
                    `;

                    articulosResultados.innerHTML = html;
                }

            })
            .catch(console.log)
            .finally(() => {
                spinner.classList.toggle('hidden');
            })
    }, 500);

}

btnBuscador.addEventListener('click', buscadorFunction);