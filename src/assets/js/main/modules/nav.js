let $html = $('html'),
    $header = $('.header'),
    $nav = $('nav.nav'),
    $search = $nav.find('#search'),
    navOpened = false;
// открываем меню при наведении
$('.js-menu-hover').on('click', function(e) {
    e.preventDefault();
    let $link = $(this),
        $navItem = $($link.data('menu'));
    if ($navItem.length ) {
        if( !$navItem.hasClass('opened')) {
            $navItem.addClass('opened').siblings().removeClass('opened');
        }
        $('.nav .container').animate({scrollTop: $navItem.position().top}, 250);
    }
    $html.removeClass('search-opened').addClass('nav-opened');
});
// открываем меню при клике
$('.js-menu-click').on('click', function(e) {
    e.preventDefault();
    if( $html.hasClass('nav-opened') ) {
        $html.removeClass('nav-opened');
    } else {
        let $link = $(this),
            $navItem = $($link.data('menu'));
        if ($navItem.length ) {
            if( !$navItem.hasClass('opened')) {
                $navItem.addClass('opened').siblings().removeClass('opened');
            }
            $('.nav .container').animate({scrollTop: $navItem.position().top}, 250);
        } else {
            $('.nav .container').scrollTop(0);
        }
        $html.removeClass('search-opened').addClass('nav-opened');
    }
});
// переключаем меню при наведении или клике
$('.nav__item-title').on('mouseenter click', function(e) {
    e.preventDefault();
    let $navItem = $(this).parents('.nav__item');
    if( ! $navItem.hasClass('opened') ) {
        $navItem.addClass('opened').siblings().removeClass('opened')
    }
});
// прячем меню
let navHide;
$nav.on('mouseleave', function(){
    if( $(window).width() <= 767 ) return; // скрываем только по клику на мобильном
    navHide = setTimeout(function(){
        $html.removeClass('nav-opened');
    }, 50);
});
$header.on('mouseenter', function(){
    if( navHide ) clearTimeout(navHide);
});
// открываем поиск
$('.js-menu-search').on('click', function(e) {
    e.preventDefault();
    if( $html.hasClass('search-opened') ) {
        $html.removeClass('search-opened');
        if( navOpened ) {
            $html.addClass('nav-opened');
            navOpened = false;
        }
    } else {
        navOpened = $html.hasClass('nav-opened');
        $search.find('.js-search input').focus();
        $html.removeClass('nav-opened').addClass('search-opened');
    }
});