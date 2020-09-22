$('.partners__items.js-slider').each(function(){
    if( $(this).find('.partners__item').length <= 1 ) return;
    $(this).parents('.section').find('.section__head').addClass('with-arrows');
    let $_el = $(this),
        $_nav = $('<div class="slick-nav" />').insertAfter($_el.parents('.section__content')),
        $_counter = $('<div class="slick-counter" />').appendTo($_nav);
    $_el.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        let i = (currentSlide || 0) + 1;
        $_counter.html('<span>'+i+'</span>/' + slick.slideCount);
    }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height());
    }).slick({
        lazyLoad: 'ondemand',
        appendArrows: $_nav,
        prevArrow: slickPrevArrow,
        nextArrow: slickNextArrow,
        rows: 3,
        slidesPerRow: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    rows: 2,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 996,
                settings: {
                    rows: 1,
                    slidesPerRow: 4
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 1,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 1,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 1,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 1,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 1,
                    slidesPerRow: 3
                }
            },
            {
                breakpoint: 479,
                settings: {
                    rows: 1,
                    slidesPerRow: 2
                }
            }
        ]
    });
});