document.querySelectorAll('.company__info.js-slider').forEach(item => {
    // init slider classes
    let slider = sliderAdd(item);
    // show arrows always if slides more 4
    if( slider.querySelectorAll('.swiper-slide').length > 4 )
        slider.classList.add('always');
    // init slider
    let sliderInstance = new Swiper(slider, {
        speed: 400,
        spaceBetween: 32,
        slidesPerView: 1,
        watchOverflow: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        breakpoints: {
            1440: {
                slidesPerView: 4,
            },
            769: {
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