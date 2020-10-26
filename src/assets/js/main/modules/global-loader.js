const loader = document.querySelector('.global-loader')

function openLoader() {
    loader.classList.add('global-loader--show')
}

function closeLoader() {
    loader.classList.remove('global-loader--show')
}

window.openLoader = openLoader
window.closeLoader = closeLoader
