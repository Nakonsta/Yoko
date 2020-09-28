let advantagesSlider = document.querySelector('.advantages-slider-js')
let prevButton = advantagesSlider ? advantagesSlider.querySelector('.swiper-button-prev') : null
let nextButton = advantagesSlider ? advantagesSlider.querySelector('.swiper-button-next') : null
// TODO: сделать универсальный слайдер


if (advantagesSlider) {
    let advantagesSliderInstance = new Swiper(advantagesSlider, {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 2,
        watchOverflow: true,
        navigation: {
            nextEl: prevButton,
            prevEl: nextButton,
        },
        breakpoints: {
            1440: {
                slidesPerView: 4,
            },
        },
    });

    console.log(advantagesSliderInstance)

    // advantagesSliderInstance.detachEvents();
}
