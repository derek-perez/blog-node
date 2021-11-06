const params = new URLSearchParams(location.search);
const contract = params.get('id');

document.querySelector('h1').innerHTML = contract;