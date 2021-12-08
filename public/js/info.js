const checkbox = document.querySelector('#check');
const body = document.querySelector('body');
const navBar = document.querySelector('.navBar');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark')
    navBar.classList.toggle('dark')
});