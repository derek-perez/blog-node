// Url
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';


// Referencias HTML
const body = document.querySelector('body')
const blog = document.querySelector('.blog');
const spinner = document.querySelector('.spinner');
const userImg = document.querySelector('.userImg');
const userAccount = document.querySelector('.userAccount');
const cerrarSesion = document.querySelector('.cerrarSesion');
const blogsTitles = document.querySelector('.blogsTitles');
const tusBlogs = document.querySelector('.tusBlogs');
const menuBlog = document.querySelector('.menuBlog');
const menuDoor = document.querySelector('.menuDoor');
const itemsBlog = document.querySelectorAll('.itemBlog');
const close = document.querySelector('.close');
const resultadosDeMenu = document.querySelector('.resultadosDeMenu');

// Verificar si está logueado
blog.classList.add('hidden')
spinner.classList.remove('hidden');

const token = localStorage.getItem('token');

if (token === null || token === undefined) {
    window.location = '../auth.html';
}

window.addEventListener('load', () => {
    fetch(url, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg }) => {
            if (msg !== 'Token válido') {
                window.location = public + 'auth.html';
            }
        })
        .catch(err => {
            window.location = public + 'auth.html';
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

// Poner color a un elemento clickeado del menú e ir a ese elemento
for (let i = 0; i < itemsBlog.length; i++) {
    itemsBlog[i].onclick = (e) => {

        const irA = e.path[0].title;

        window.location.href = public + `blog/${irA}/`;

        let j = 0;
        while (j < itemsBlog.length) {
            itemsBlog[j++].className = 'itemBlog';
        }
        itemsBlog[i].className = 'itemBlog active';
    }
}