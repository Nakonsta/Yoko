let markGallerySlider = document.querySelector('.gallery-top')
if(markGallerySlider) {

    const galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,

        loop: true,
        // centeredSlides: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
    });

    const galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        thumbs: {
            swiper: galleryThumbs
        }
    });

    galleryThumbs.on('slideChange', function () {
        galleryTop.slideToLoop(galleryThumbs.realIndex);
    });

}
