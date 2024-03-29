document.querySelectorAll('.steps').forEach(steps => {

    let stepsTabs = steps.querySelectorAll('.section__title-tabs a');

    stepsTabs.forEach(item => {
        item.addEventListener('click', evt => {
            evt.preventDefault();
            stepsTabs.forEach(tab => {
                tab.classList.remove('active');
                let slider = document.getElementById(tab.getAttribute('href').slice(1));
                if( slider ) slider.closest('.swiper').style.display = 'none';
            });
            item.classList.add('active');
            let slider = document.getElementById(item.getAttribute('href').slice(1));
            if( slider ) {
                slider.closest('.swiper').style.display = 'block';
                window.dispatchEvent(new Event('resize'));
                // прячем или показываем навиацию
                let swiper = slider.closest('.swiper-container').sliderInstance;
                if (swiper.isLocked && !slider.classList.contains('locked') ) {
                    slider.classList.add('locked');
                } else if (!swiper.isLocked && slider.classList.contains('locked') ) {
                    slider.classList.remove('locked');
                }
            }
        });
    });

    steps.querySelectorAll('.steps__items.js-slider').forEach(item => {
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
                1250: {
                    slidesPerView: 3,
                },
                768: {
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
        slider.sliderInstance = sliderInstance;
    });

    // инициализируем клик по активному ИЛИ первому
    if( stepsTabs.length ) {
        let link = steps.querySelector('.section__title-tabs a.active') || steps.querySelector('.section__title-tabs a:nth-child(1)');
        if (link) {
            link.dispatchEvent(new Event('click'));
        }
    }
});