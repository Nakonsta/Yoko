let advantagesSlider = document.querySelector('.advantages-slider-js')
let prevButton = advantagesSlider ? advantagesSlider.querySelector('.swiper-button-prev') : null
let nextButton = advantagesSlider ? advantagesSlider.querySelector('.swiper-button-next') : null
// TODO: сделать универсальный слайдер


if (advantagesSlider) {
    let advantagesSliderInstance = new Swiper(advantagesSlider, {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 1,
        watchOverflow: true,
        navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
        },
        breakpoints: {
            1440: {
                slidesPerView: 4,
            },
            769: {
                slidesPerView: 2,
            },
        },
    });

    console.log(advantagesSliderInstance)

    // advantagesSliderInstance.detachEvents();
}
