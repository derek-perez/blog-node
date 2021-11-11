const params = new URLSearchParams(location.search);
const idArticulo = params.get('id');

document.querySelector('h1').innerText = idArticulo;