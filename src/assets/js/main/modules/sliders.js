global.sliderPrevBtn = '<div class="swiper-button-prev"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 2.5L2.25 10L9.75 17.5" stroke="#31ACB8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
global.sliderNextBtn = '<div class="swiper-button-next"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 2.5L9.75 10L2.25 17.5" stroke="#31ACB8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'

global.sliderAdd = function(items) {
    // добавляем класс для .section__head чтобы было куда выводить навигацию слайдеров на планшетах
    let head = items.closest('.section').querySelector('.section__head');
    if( head ) head.classList.add('with-slider');
    // wrap slider & add classes
    let swiper = document.createElement("div");
    swiper.classList.add('swiper');
    items.parentNode.insertBefore(swiper, items);
    swiper.appendChild(items);
    let container = document.createElement("div");
    container.classList.add('swiper-container');
    items.parentNode.insertBefore(container, items);
    container.appendChild(items);
    items.classList.add('swiper-wrapper');
    // add nav
    let nav = document.createElement("div");
    nav.classList.add('swiper-navigation');
    nav.innerHTML = sliderPrevBtn + sliderNextBtn;
    container.insertBefore(nav, container.firstChild);
    // add class for slides
    for( let i=0; i < items.children.length; i++ ) {
        items.children[i].classList.add('swiper-slide');
    }
    return container;
}
