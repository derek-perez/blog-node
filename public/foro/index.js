// Url's
const uploadIMG = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/uploads/'
    : 'https://blogi-node.herokuapp.com/api/uploads/';

const validarJwt = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

// Variables
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');
const foro = document.querySelector('.foro');
const discusion = document.querySelector('.discusion');
const descripcion = document.querySelector('#descripcion');
const urlWindow = document.querySelector('.urlWindow');
const imgWindow = document.querySelector('.imgWindow');
const urlImg = document.querySelector('.urlImg');
const fileImg = document.querySelector('.fileImg');
const imgMala = document.querySelector('.imgMala');
const imgMalaBtn = document.querySelector('.imgMalaBtn');
const crearBlog = document.querySelector('.crearBlog');
const nuevaDiscusion = document.querySelector('.nuevaDiscusion');

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

// Obtener token y verificarlo
const token = localStorage.getItem('token');

// if (token === null) {
//     nuevaDiscusion.classList.add('hidden');
// } else if (token !== null) {
//     fetch(validarJwt, {
//         method: 'GET',
//         headers: { 'x-token': token }
//     })
//         .then(resp => resp.json())
//         .then(({ msg }) => {
//             if (msg !== 'Token válido') {
//                 nuevaDiscusion.classList.add('hidden');
//             } else {
//                 crearBlog.classList.toggle('hidden');
//             }
//         })
// }

// Botón que abre discusión
nuevaDiscusion.addEventListener('click', () => {
    discusion.classList.toggle('hidden');
    foro.classList.toggle('hidden');
})

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

const funcionesParaArticulos = () => {

    // Negrita, subrayado, cursiva
    const negrita = document.querySelector('.negrita');
    const subrayado = document.querySelector('.subrayado');
    const cursiva = document.querySelector('.cursiva');
    const imgBtn = document.querySelector('.imgBtn');
    const urlBtn = document.querySelector('.urlBtn');
    const ponerUrlImg = document.querySelector('.ponerUrlImg');
    const ponerFileImg = document.querySelector('.ponerFileImg');

    const etiquetaStrong = () => {
        let desde = descripcion.selectionStart;
        let hasta = descripcion.selectionEnd;
        let elTexto = descripcion.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcion.setRangeText(`<b>${sel}</b>`, desde, hasta, 'select');
        }
    }

    const etiquetaSubrayado = () => {
        let desde = descripcion.selectionStart;
        let hasta = descripcion.selectionEnd;
        let elTexto = descripcion.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcion.setRangeText(`<u>${sel}</u>`, desde, hasta, 'select');
        }
    }

    const etiquetaCursiva = () => {
        let desde = descripcion.selectionStart;
        let hasta = descripcion.selectionEnd;
        let elTexto = descripcion.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcion.setRangeText(`<i>${sel}</i>`, desde, hasta, 'select');
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

    const urlFunction = () => {
        const urlRequerida = document.querySelector('.urlRequerida');
        const aparecerUrl = document.querySelector('.aparecerUrl');

        const ponerUrl = document.querySelector('.ponerUrl');

        ponerUrl.addEventListener('click', () => {
            insertAtCaret('descripcion', `<a href="${urlRequerida.value}">${aparecerUrl.value}</a>`);
            urlWindow.classList.toggle('hidden');
        })
    }

    const imgConUrl = () => {
        const img = urlImg.value;

        if (img.includes('data:image/')) {
            imgWindow.classList.toggle('hidden');
            imgMala.classList.toggle('hidden');

            imgMalaBtn.addEventListener('click', () => {
                imgMala.classList.toggle('hidden')
            })

        } else {
            insertAtCaret('descripcion', `<img src="${img}" class="imgTextarea"></img>`);
            imgWindow.classList.toggle('hidden');
            urlImg.value = '';
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
                    insertAtCaret('descripcion', `<img src="${url}" class="imgTextarea"></img>`);
                    imgWindow.classList.toggle('hidden');
                })
                .catch(console.error)
        }

        reader.readAsDataURL(fileImg.files[0]);
    }

    urlBtn.addEventListener('click', () => {
        urlWindow.classList.toggle('hidden');
        urlFunction();
    })
    imgBtn.addEventListener('click', () => {
        imgWindow.classList.toggle('hidden');

        ponerUrlImg.addEventListener('click', imgConUrl)
        ponerFileImg.addEventListener('click', imgFile)
    })
}

funcionesParaArticulos();

// Abrir escribircomentario
const abrirEscritor = document.querySelector('#deste');
const escribirComentario = document.querySelector('.escribirComentario');

abrirEscritor.addEventListener('click', () => {
    escribirComentario.classList.toggle('hidden');
    abrirEscritor.classList.toggle('hidden');
})