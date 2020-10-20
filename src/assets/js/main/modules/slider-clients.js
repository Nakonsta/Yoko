document.querySelectorAll('.clients__items.js-slider').forEach(item => {
    // init slider classes
    let slider = sliderAdd(item);
    // init slider
    let sliderInstance = new Swiper(slider, {
        speed: 400,
        spaceBetween: 24,
        slidesPerView: 1,
        watchOverflow: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        breakpoints: {
            1500: {
                slidesPerView: 7,
            },
            1251: {
                slidesPerView: 6,
            },
            1025: {
                slidesPerView: 5,
            },
            800: {
                slidesPerView: 4,
            },
            600: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 2,
            },
        },
        on: {
            // события чтобы прятать навиацию если она не нужна
            init: function () {
                if( this.isLocked ) {
                    slider.classList.add('locked');
                    this.update();
                }
            },
            resize: function () {
                if (this.isLocked && !slider.classList.contains('locked') ) {
                    slider.classList.add('locked');
                    this.update();
                } else if (!this.isLocked && slider.classList.contains('locked') ) {
                    slider.classList.remove('locked');
                    this.update();
                }
            },
        },
    });
});