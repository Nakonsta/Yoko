document.querySelectorAll('.info-slider .js-slider').forEach(slider => {
    // add nav btns
    let nav = document.createElement("div")
    nav.classList.add('info-slider__navigation-slider')
    nav.innerHTML = sliderPrevBtn + sliderNextBtn
    slider.insertBefore(nav, slider.firstChild)
    let prevButton = slider.querySelector('.swiper-button-prev') || null
    let nextButton = slider.querySelector('.swiper-button-next') || null
    // show arrows always if slides more 4
    if( slider.querySelectorAll('.swiper-slide').length > 4 )
        slider.classList.add('always')
    // init slider
    let sliderInstance = new Swiper(slider, {
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

    console.log(sliderInstance)
})