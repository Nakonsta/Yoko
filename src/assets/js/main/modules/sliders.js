let advantagesSlider = document.querySelector('.advantages-slider-js')

if (advantagesSlider) {
    let advantagesSliderInstance = new Swiper(advantagesSlider, {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 2,
        breakpoints: {
            1440: {
                slidesPerView: 4,
            },
        }
    });
}
