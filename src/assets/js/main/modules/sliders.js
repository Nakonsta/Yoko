let advantagesSlider = document.querySelector('.advantages-slider-js')

// TODO: сделать универсальный слайдер

if (advantagesSlider) {
    let advantagesSliderInstance = new Swiper(advantagesSlider, {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 2,
        breakpoints: {
            1440: {
                slidesPerView: 4,
            },
        }
    });

    // advantagesSliderInstance.detachEvents();
}
