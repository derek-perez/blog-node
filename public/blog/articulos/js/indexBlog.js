// Url
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

const articulosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/usuario/'
    : 'https://blogi-node.herokuapp.com/api/articulos/usuario/';


// Referencias HTML
const body = document.querySelector('body')
const login = document.querySelector('.login');

const irARegister = document.querySelector('.irARegister');

const blog = document.querySelector('.blog');
const spinner = document.querySelector('.spinner');

const userAccount = document.querySelector('.userAccount');
const userImg = document.querySelector('.userImg');
const userImgAccount = document.querySelector('.userImgAccount');
const nombre = document.querySelector('.nombre');
const correo = document.querySelector('.correo');
const cerrarSesion = document.querySelector('.cerrarSesion');

const blogsTitles = document.querySelector('.blogsTitles');
const tusBlogs = document.querySelector('.tusBlogs');
const menuBlog = document.querySelector('.menuBlog');
const menuDoor = document.querySelector('.menuDoor');
const itemsBlog = document.querySelectorAll('.itemBlog');
const close = document.querySelector('.close');

const resultadosDeMenu = document.querySelector('.resultadosDeMenu');
const articulosResultados = document.querySelector('.articulosResultados');
const noHay = document.querySelector('.noHay');

// Verificar si está logueado y personalizar Navbar
blog.classList.add('hidden')
spinner.classList.remove('hidden');

const token = localStorage.getItem('token');

const darChanceDeIrse = () => {
    login.classList.remove('hidden');
    irARegister.href = public + 'auth.html';
    setTimeout(() => {
        window.location.href = public + 'auth.html';
    }, 10000);
}

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

window.addEventListener('load', () => {
    fetch(url, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg, usuario }) => {
            if (msg !== 'Token válido') {
                darChanceDeIrse();
            }

            const idDeUsuario = usuario.uid;

            // Personalizar Navbar
            userImg.src = usuario.img;
            userImgAccount.src = usuario.img;
            nombre.innerText = usuario.nombre;
            correo.innerText = usuario.correo;

            fetch(articulosUrl + idDeUsuario, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(articulo => {
                    if (articulo.length === 0) {
                        noHay.classList.remove('hidden')
                    } else {
                        articulo.forEach(a => {

                            // Se crea el string para la fecha
                            const fechaMal = a.creadoEn.split(' ');
                            const arrayBuena = fechaMal.splice(0, 4);

                            const dia = cambiarAEspañolDia(arrayBuena[0]);
                            const mes = cambiarAEspañolMes(arrayBuena[1]);

                            let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                            const html = `
                                <div class="articuloMini">
                                    <div class="topArticle">
                                        <img src="${a.img}" alt="Imagen de articulo" class="imgArticle">
                                        <div class="articleText">
                                            <span class="titleArticle">${a.titulo}</span>
                                            <span class="descArticle">${a.contenido}</span>
                                        </div>
                                    </div>
                                    <span class="fechaArticle">${fecha}</span>
                                    <div class="buttons">
                                        <button class="btn btn-primary">Ver artículo</button>
                                        <button class="btn btn-warning">Editar artículo</button>
                                        <button class="btn btn-success">Compartir artículo</button>
                                        <button class="btn btn-danger">Borrar artículo</button>
                                    </div>
                                </div>
                            `;

                            articulosResultados.innerHTML += html;
                        })
                    }


                })
                .catch(console.error)

        })
        .catch(err => {
            darChanceDeIrse();
        })
        .finally(() => {
            blog.classList.remove('hidden')
            spinner.classList.add('hidden');
        })
})

// Menú responsive
if (window.innerWidth <= 950) {
    menuDoor.addEventListener('click', () => {
        menuBlog.classList.remove('hidden');
        menuBlog.classList.add('responsive');
        menuBlog.classList.remove('animate__bounceOutLeft');
    })

    close.addEventListener('click', () => {
        menuBlog.classList.add('animate__bounceOutLeft');
        menuBlog.classList.add('hidden');
    })
} else {
    menuDoor.addEventListener('click', () => {
        menuBlog.classList.toggle('animate__bounceOutLeft');
        setTimeout(() => {
            menuBlog.classList.toggle('hidden');
            resultadosDeMenu.classList.toggle('wC');
        }, 500);
    })
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

// Abrir cuadro de usuario
userImg.addEventListener('click', () => {
    userAccount.classList.toggle('hidden');
});

// Cerrar sesión
cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = public + '/index.html'
})

// Ver todos los blogs
blogsTitles.addEventListener('click', () => {
    tusBlogs.classList.toggle('hidden')
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

window.addEventListener('load', aparecedorDeResultado)

// Poner color a un elemento clickeado del menú e ir a ese elemento
for (let i = 0; i < itemsBlog.length; i++) {
    itemsBlog[i].onclick = (e) => {

        // Se toma el titlw de el item del Menú seleccionado y se pone en la Url
        const irA = e.path[0].title;

        window.location.href = public + `blog/articulos/#${irA}`;

        let j = 0;
        while (j < itemsBlog.length) {
            itemsBlog[j++].className = 'itemBlog';
        }
        itemsBlog[i].className = 'itemBlog active';
        aparecedorDeResultado();
    }
}

// Edición/Creación de un articulo
const crearArticulo = document.querySelector('#crearArticulo');
const editArticulo = document.querySelector('.editArticulo');
const cerrarVentana = document.querySelector('.cerrarVentana');
const verArticulo = document.querySelector('.verArticulo');
const vistaPrevia = document.querySelector('.vistaPrevia');
const Texto = document.querySelector('#conHtml');

crearArticulo.addEventListener('click', () => {
    editArticulo.classList.remove('hidden');
    body.classList.add('wC');
    blog.classList.add('hidden');
    editArticulo.classList.add('animate__backInRight');
})

verArticulo.addEventListener('click', () => {
    vistaPrevia.classList.toggle('hidden');
    Texto.classList.toggle('hidden')
})

cerrarVentana.addEventListener('click', () => {
    editArticulo.classList.add('hidden');
    body.classList.remove('wC');
    blog.classList.remove('hidden');
})

// Hoja para editar/escribir artículo
const negrita = document.querySelector('.negrita');
const subrayado = document.querySelector('.subrayado');
const cursiva = document.querySelector('.cursiva');
const resultado = document.querySelector('#resultado');

Texto.addEventListener('keydown', () => {

    const arrTextarea = Texto.value.split('\n');

    const espacio = () => {
        arrTextarea.forEach(t => {
            const parrafo = document.createElement('p');
            parrafo.innerHTML = t;
        })
        const linea = arrTextarea.join('<br>');

        resultado.innerHTML = linea;
    }

    espacio();

})

// Negrita, subrayado, cursiva
const etiquetaStrong = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<strong>${sel}</strong>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}

const etiquetaSubrayado = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<span class="underline">${sel}</span>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}

const etiquetaCursiva = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<span class="cursiva">${sel}</span>`, desde, hasta, 'select');
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
        Texto.setRangeText(`<p class="alignP alignLeft">${sel}</p>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}
const textAlignCenter = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<p class="alignP alignCenter">${sel}</p>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}
const textAlignJustify = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<p class="alignP alignJustify">${sel}</p>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}
const textAlignRight = () => {
    let desde = Texto.selectionStart;
    let hasta = Texto.selectionEnd;
    let elTexto = Texto.value;

    let sel = elTexto.substring(desde, hasta);

    if (sel.length > 0) {// si hay algo seleccionado
        Texto.setRangeText(`<p class="alignP alignRight">${sel}</p>`, desde, hasta, 'select');
        resultado.innerHTML = Texto.value;
    }
}

alignLeft.addEventListener('click', () => {
    textAlignLeft();
})
alignCenter.addEventListener('click', () => {
    textAlignCenter();
})
alignJustify.addEventListener('click', () => {
    textAlignJustify();
})
alignRight.addEventListener('click', () => {
    textAlignRight();
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
})
subtitulo.addEventListener('click', () => {
    subtituloText();
})
parrafo.addEventListener('click', () => {
    parrafoText();
})

// Url e IMG
const link = document.querySelector('.link');
const img = document.querySelector('.img');
const imgDeVentana = document.querySelector('#imgDeVentana');
const urlVentana = document.querySelector('.urlVentana');
const imgVentana = document.querySelector('.imgVentana');
const ponerUrl = document.querySelector('.ponerUrl');
const ponerImg = document.querySelector('.ponerImg');

link.addEventListener('click', () => {
    urlVentana.classList.toggle('hidden');
})
img.addEventListener('click', () => {
    imgVentana.classList.toggle('hidden');
})
ponerUrl.addEventListener('click', () => {
    urlVentana.classList.toggle('hidden');
})
ponerImg.addEventListener('click', () => {
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

function previewFile() {
    var preview = document.createElement('img');
    var file = imgDeVentana.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        var imgNueva = preview.src = reader.result;
        insertAtCaret('conHtml', `<img src="${imgNueva}"></img>`);
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

ponerImg.addEventListener('click', previewFile);