let burgerButton = document.querySelector('.mobile-header__burger-button')
let closeButton = document.querySelector('.mobile-nav__close')
let bgMenu = document.querySelector('.mobile-nav__bg')
let mobileMenu = document.querySelector('.mobile-nav')
let activeClassMenu = 'mobile-nav--open'

if (burgerButton) {
    burgerButton.addEventListener('click', () => {
        mobileMenu.classList.add(activeClassMenu)
    })
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove(activeClassMenu)
    })
}

if (bgMenu) {
    bgMenu.addEventListener('click', () => {
        mobileMenu.classList.remove(activeClassMenu)
    })
}
