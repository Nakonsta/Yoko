$('.mainvideo__items.js-slider').each(function(){
    if( $(this).find('.mainvideo__item').length <= 1 ) return;
    let $_el = $(this),
        $_nav = $('<div class="slick-nav" />').appendTo($(this).parents('.mainvideo').find('.mainvideo__content')),
        $_counter = $('<div class="slick-counter" />').appendTo($_nav);
    $_el.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        let i = (currentSlide || 0) + 1;
        $_counter.html('<span>'+i+'</span>/' + slick.slideCount);
    }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height());
    }).slick({
        lazyLoad: 'ondemand',
        variableWidth: true,
        appendArrows: $_nav,
        prevArrow: slickPrevArrow,
        nextArrow: slickNextArrow,
    });
});