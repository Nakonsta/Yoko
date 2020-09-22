$('.mainslider__items').each(function(){
    if( $(this).find('.mainslider__item').length <= 1 ) return;
    let $_el = $(this),
        $_nav = $('<div class="slick-nav" />').appendTo($(this).parent()),
        $_counter = $('<div class="slick-counter" />').appendTo($_nav),
        $_timer = $('<div class="slick-timer"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="20" stroke-width="4" stroke="#ffffff"></circle></svg></div>').appendTo($(this).parent()),
        circle = $_timer[0].querySelector('circle'),
        l = 2 * Math.PI * circle.getAttribute('r'),
        speed = 5; // autoplay speed seconds
    circle.style.transition = 'none';
    circle.style.strokeDasharray = l + ' ' + l;
    circle.style.strokeDashoffset = l;
    circle.getBoundingClientRect();
    circle.style.transition = 'stroke-dashoffset 5s linear';
    circle.style.strokeDashoffset = '0';
    $_el.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        circle.style.transition = 'none';
        circle.style.strokeDasharray = l + ' ' + l;
        circle.style.strokeDashoffset = l;
        circle.getBoundingClientRect();
        circle.style.transition = 'stroke-dashoffset ' + speed + 's linear';
        circle.style.strokeDashoffset = '0';
    }).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        let i = (currentSlide || 0) + 1;
        $_counter.html('<span>'+i+'</span>/' + slick.slideCount);
    }).slick({
        lazyLoad: 'ondemand',
        fade: true,
        appendArrows: $_nav,
        prevArrow: slickPrevArrow,
        nextArrow: slickNextArrow,
        autoplay: true,
        autoplaySpeed: speed*1000,
        pauseOnHover: false,
    });
});