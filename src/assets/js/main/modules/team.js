$('.team__items.js-slider').each(function(){
    if( $(this).find('.team__item').length <= 1 ) return;
    // $(this).parents('.section').find('.section__head').addClass('with-arrows');
    let $_el = $(this),
        $_nav = $('<div class="slick-nav" />').insertAfter($_el),
        $_counter = $('<div class="slick-counter" />').appendTo($_nav);
    $_el.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        let i = (currentSlide || 0) + 1;
        $_counter.html('<span>'+i+'</span>/' + slick.slideCount);
    }).slick({
        lazyLoad: 'ondemand',
        variableWidth: true,
        appendArrows: $_nav,
        prevArrow: slickPrevArrow,
        nextArrow: slickNextArrow,
    });
});