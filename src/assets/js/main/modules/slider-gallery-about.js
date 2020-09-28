let aboutGallerySlider = document.querySelector('.about-us-gallery-js')
let prevButton = aboutGallerySlider ? aboutGallerySlider.querySelector('.swiper-button-prev') : null
let nextButton = aboutGallerySlider ? aboutGallerySlider.querySelector('.swiper-button-next') : null

if (aboutGallerySlider) {
    let aboutGallerySliderInstance

    function sliderInit() {
        aboutGallerySliderInstance = new Swiper(aboutGallerySlider, {
            speed: 400,
            spaceBetween: 32,
            slidesPerView: 1,
            watchOverflow: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
        });
    }

    function toggleSlider() {
        if (window.innerWidth > 769) {
            if (aboutGallerySliderInstance && aboutGallerySliderInstance.el.classList.contains('swiper-container-initialized')) {
                aboutGallerySliderInstance.destroy(false)
            }
        } else {
            if (!aboutGallerySliderInstance || !aboutGallerySliderInstance.el.classList.contains('swiper-container-initialized')) {
                sliderInit()
            }
        }
    }

    toggleSlider()
    window.addEventListener('resize', toggleSlider)
}
